import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomPwDto {
	@IsString()
    @IsNotEmpty()
    public userName: string;

	@IsNumber()
	@IsNotEmpty()
	public roomId: number;

	@IsString()
    @IsNotEmpty()
	public password: string;
}
