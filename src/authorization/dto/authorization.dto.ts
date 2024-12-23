import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class AuthorizationDto {
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    readonly authorizations: string[];
}