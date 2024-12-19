import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Response } from 'express';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
        const tokens = await this.authService.login(loginDto);
        res.cookie('accessToken', tokens.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            // maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', tokens.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            // maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        return new ApiResponseDto(true, tokens)
    }

    @Post('register')
    async register(@Res({ passthrough: true }) res: Response,@Body() createUserDto: CreateUserDto) {
        const tokens = await this.authService.register(createUserDto);
        res.cookie('accessToken', tokens.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            // maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', tokens.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            // maxAge: 7 * 24 * 60 * 60 * 1000 
        });
        return new ApiResponseDto(true, tokens)
    }
}
