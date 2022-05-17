import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class JoinRoomDto {

	@IsNumber()
	@IsOptional()
	public userId?: number;

	@IsString()
	@IsOptional()
	public userName?: string;

	@IsNumber()
	@IsOptional()
    public roomId?: number;


	@IsString()
	@IsOptional()
	public roomName?: string;

	@IsString()
	@IsOptional()
    public entered_pw?: string;
}
