import { IsNumber, IsString } from "class-validator";

export class lookingForAGameDto{

    // @IsNumber()
    userId: number;

    // @IsString()
    difficulty: string;

}