import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleModel } from './role.model';
import { Model, Types } from 'mongoose';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(RoleModel.name) private readonly roleModel: Model<RoleModel>
    ) { }

    async createRole(roleDto: RoleDto): Promise<RoleModel> {
        const newRole = await new this.roleModel(roleDto).save()

        return newRole
    }

    async getRoles(): Promise<RoleModel[]> {
        const roles = await this.roleModel.find()

        return roles
    }

    async getRoleById(roleId: string): Promise<RoleModel> {
        const role = await this.roleModel.findById(roleId)

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND)
        }

        return role
    }


    // auth:[1,2,3] => auth[1,3]
    async updateRole(roleId: string, roleDto: RoleDto): Promise<RoleModel> {
        const role = await this.roleModel.findByIdAndUpdate(roleId, roleDto);

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND)
        }

        return role
    }

    async addAuthorization(roleId: string, authorizationId: Types.ObjectId): Promise<RoleModel> {
        const role = await this.roleModel.findById(roleId);

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND)
        }

        if (role.authorizations.includes(authorizationId)) {
            throw new HttpException('Authorization already exists!', HttpStatus.BAD_REQUEST)
        }

        role.authorizations.push(authorizationId);
        await role.save();

        return role;
    }

    async deleteRole(roleId: string): Promise<any> {
        const role = await this.roleModel.findByIdAndDelete(roleId);

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND)
        }

        return { message: 'Role successfully deleted!' }
    }
}
