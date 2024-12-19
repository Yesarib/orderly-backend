import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { isValidPassword } from 'src/utils/jwt.util';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

export interface AuthResponse {
    access_token: string
    refresh_token: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private config: ConfigService
    ) { }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        if (!loginDto.email && !loginDto.phoneNumber) {
            throw new HttpException('email or phone number is not specified!', HttpStatus.BAD_REQUEST)
        }

        const user = loginDto.email ? await this.userService.getUserByEmail(loginDto.email) : await this.userService.getUserByPhoneNumber(loginDto.phoneNumber);
        
        if (!user) {
            throw new HttpException('user not found!', HttpStatus.NOT_FOUND)
        }

        const isMatch = await isValidPassword(loginDto.password, user.password);
        if (!isMatch) {
            throw new HttpException('Username or password does not match', HttpStatus.UNAUTHORIZED);
        }

        user.lastEntry = new Date();
        await user.save();

        const token = await this.getTokens(String(user._id), user.role)
        return token;
    }

    async register(registerDto: CreateUserDto): Promise<AuthResponse> {
        const user = await this.userService.createUser(registerDto);

        const tokens = await this.getTokens(String(user._id), user.role);

        return tokens;
    }

    private async getTokens(userId: string, userRole?: string): Promise<AuthResponse> {
        const jwtPayload = {
            sub: userId,
            roles: userRole
        };

        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
                expiresIn: '7d',
            })
        ])

        return {
            access_token,
            refresh_token
        }
    }
}
