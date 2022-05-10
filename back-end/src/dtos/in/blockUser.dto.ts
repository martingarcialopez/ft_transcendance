import { IsNumber } from 'class-validator';

export class BlockUserDto {

	@IsNumber()
    userId: number;

	@IsNumber()
    blockUserId: number;
}
