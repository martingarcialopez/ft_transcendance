import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    firstname: string;

    @IsOptional()
    @IsString()
    lastname: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsOptional()
    @IsString()
    avatar: string;
}