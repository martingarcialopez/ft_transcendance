import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateAdminDto {
	@IsNumber()
    userId: number;

	@IsNumber()
    roomId: number;

    @IsBoolean()
    toAdd: boolean;
}
