import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    @HttpCode(201)
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)

        return new ApiResponseDto(true, user)
    }

    @Get()
    async getUsers() {
        const users = await this.userService.getUsers()

        return new ApiResponseDto(true, users)
    }
    
    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        const user = await this.userService.getUserById(userId)

        return new ApiResponseDto(true, user)
    }

    @Get('/email?')
    async getUserByEmail(@Query('email') email: string) {
        const user = await this.userService.getUserByEmail(email)
        return new ApiResponseDto(true, user)
    }

    @Get('/phoneNumber?')
    async getUserByPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
        const user = await this.userService.getUserByPhoneNumber(phoneNumber)

        return new ApiResponseDto(true, user)
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.userService.updateUser(userId, updateUserDto)

        return new ApiResponseDto(true, user)
    }

    @Delete(':userId')
    @HttpCode(204)
    async deleteUser(@Param('userId') userId: string) {
        await this.userService.deleteUser(userId)
    }
}
