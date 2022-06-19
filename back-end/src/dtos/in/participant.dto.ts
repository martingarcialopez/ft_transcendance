import { IsNotEmpty, IsNumber, IsBoolean,IsOptional } from 'class-validator';

export class ParticipantDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    @IsNumber()
    @IsNotEmpty()
    public roomId: number;

	@IsOptional()
	@IsBoolean()
	public toAdd?: boolean;
}
