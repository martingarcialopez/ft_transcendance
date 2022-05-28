import { IsNumber, IsString, IsOptional } from 'class-validator';

export class BanUserDto {

	@IsNumber()
    userId: number;

	@IsNumber()
    userIdToBan: number;

	@IsNumber()
	roomId: number;

}
