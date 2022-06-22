import { IsNotEmpty, IsNumber } from 'class-validator';

export class ParticipantDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    @IsNumber()
    @IsNotEmpty()
    public roomId: number;

}
