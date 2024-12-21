import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { hashPassword } from 'src/utils/jwt.util';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
        const user = await this.userModel.findOne({
            $or: [
                { email: createUserDto.email },
                { phoneNumber: createUserDto.phoneNumber }
            ]
        });
                
        if (user) {
            throw new HttpException('This email or phone number already exist!', HttpStatus.CONFLICT)
        }

        const hashedPassword = await hashPassword(createUserDto.password);
        createUserDto.password = hashedPassword;
        const newUser = await new this.userModel(createUserDto).save();

        return newUser;
    }

    async getUsers(): Promise<UserModel[]> {
        return await this.userModel.find().exec();
    }

    async getUserById(id: string): Promise<UserModel> {
        const user = await this.userModel.findById(id).select('-password');

        if (!user) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<UserModel> {
        const user = await this.userModel.findOne({ email: email })

        return user;
    }

    async getUserByPhoneNumber(phoneNumber: string): Promise<UserModel> {
        const user = await this.userModel.findOne({ phoneNumber: phoneNumber })

        if (!user) {
            throw new HttpException('user not found!', HttpStatus.NOT_FOUND)
        }

        return user
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
        const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
        if (!user) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async deleteUser(id: string): Promise<any> {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new HttpException("User Not Found", HttpStatus.NOT_FOUND)
        }

        return { message: "User successfully deleted" };
    }
}
