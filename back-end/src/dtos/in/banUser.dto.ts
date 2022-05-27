import { IsNumber, IsString, IsOptional } from 'class-validator';

export class BanUserDto {

	@IsNumber()
    userId: number;

	@IsNumber()
	@IsOptional()
    userIdToBan: number;

	@IsString()
	@IsOptional()
	userIdToMute: string;

	@IsNumber()
	roomId: number;

}
