import { IsString } from "class-validator";

export class joinPongRoomDto {

    @IsString()
    userId: string;

    @IsString()
    roomId: string;

}