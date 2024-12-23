import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationDocument } from './authorzation.model';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorators/public.decorator';


@Public()
@Controller('authorization')
export class AuthorizationController {
    constructor(
        private readonly authorizationService: AuthorizationService
    ) { }

    @Post()
    @HttpCode(201)
    async createAuthorization(@Body() authorizationDto: AuthorizationDocument) {
        const newAuthorization = await this.authorizationService.createAuthorization(authorizationDto);
        
        return new ApiResponseDto(true,newAuthorization)
    }

    @Get()
    async getAuthorizations() {
        const authorizations = await this.authorizationService.getAuthorizations();

        return new ApiResponseDto(true,authorizations)
    }

    @Get(':authorizationId')
    async getAuthorizationById(@Param('authorizationId') authorizationId: string) {
        const authorization = await this.authorizationService.getAuthorizationById(authorizationId);

        return new ApiResponseDto(true,authorization)
    }

    @Put(":authorizationId")
    async updateAuthorization(@Param('authorizationId') authorizationId: string, @Body() authorizationDto: AuthorizationDocument) {
        const updatedAuthorization = await this.authorizationService.updateAuthorization(authorizationId, authorizationDto);

        return new ApiResponseDto(true,updatedAuthorization)
    }

    @Delete(':authorizationId')
    @HttpCode(204)
    async deleteAuthorization(@Param('authorizationId') authorizationId: string) {
        await this.authorizationService.deleteAuthorization(authorizationId);
    }
}
