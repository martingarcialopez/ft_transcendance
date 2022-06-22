import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateAdminDto {
	@IsNumber()
    userId: number;

	@IsNumber()
    roomId: number;

	@IsString()
    login: string;

    @IsBoolean()
    toAdd: boolean;
}
