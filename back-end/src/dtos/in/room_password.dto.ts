import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class RoomPwDto {
	@IsString()
    @IsNotEmpty()
    public userName: string;

	@IsNumber()
	@IsNotEmpty()
	public roomId: number;

	@IsString()
	@Length(5, 100)
	@IsNotEmpty()
	public password: string;
}
