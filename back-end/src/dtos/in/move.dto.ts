import { IsNumber, IsString } from "class-validator";

export class moveDto {

    @IsString()
    player: string;

    @IsNumber()
    move: number;

}