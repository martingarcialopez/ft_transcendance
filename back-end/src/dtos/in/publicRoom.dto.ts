import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PublicRoomDto {
	// Validates for a non-empty string
	@IsString()
	@IsNotEmpty()
	public roomName: string;

	@IsNumber()
	@IsNotEmpty()
	public userId: number;

}
