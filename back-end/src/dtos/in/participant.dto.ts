import { IsNotEmpty, IsNumber } from 'class-valida\
tor';

export class ParticipantDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    @IsNumber()
    @IsNotEmpty()
    public roomId: number;
}
