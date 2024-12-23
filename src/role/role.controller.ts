import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Types } from 'mongoose';

@Public()
@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Post()
    @HttpCode(201)
    async createRole(@Body() roleDto: RoleDto) {
        const role = await this.roleService.createRole(roleDto)

        return new ApiResponseDto(true, role)
    }

    @Get()
    async getRoles() {
        const roles = await this.roleService.getRoles()

        return new ApiResponseDto(true, roles)
    }

    @Get(':roleId')
    async getRoleById(@Param('roleId') roleId: string) {
        const role = await this.roleService.getRoleById(roleId)

        return new ApiResponseDto(true, role)
    }

    @Put(':roleId')
    async updateRole(@Param('roleId') roleId: string, @Body() roleDto: RoleDto){
        const role = await this.roleService.updateRole(roleId,roleDto)

        return new ApiResponseDto(true, role)
    }

    @Patch(':roleId/authorization/:authorizationId')
    async addAuthorization(@Param('roleId') roleId: string, @Param('authorizationId') authorizationId: Types.ObjectId){
        const role = await this.roleService.addAuthorization(roleId,authorizationId)

        return new ApiResponseDto(true, role)
    }

    @Delete(':roleId')
    @HttpCode(204)
    async deleteRole(@Param('roleId') roleId: string) {
        await this.roleService.deleteRole(roleId)
    }
}
