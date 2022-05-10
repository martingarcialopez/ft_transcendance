import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class RoomPwDto {
	@IsNumber()
    @IsNotEmpty()
    public userId: number;

	@IsNumber()
	@IsNotEmpty()
	public roomId: number;

	@IsString()
	@Length(5, 100)
	@IsNotEmpty()
	public password: string;
}
