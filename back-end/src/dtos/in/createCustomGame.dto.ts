import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber } from 'class-validator';

export class createCustomGameDto {

    @IsString()
    userId: string;

    @IsString()
    difficulty: string;

    @IsNumber()
    maxScore: number; 
} 