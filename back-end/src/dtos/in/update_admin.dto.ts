import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateAdminDto {
	@IsString()
    userName: string;

	@IsNumber()
    roomId: number;

    @IsBoolean()
    toAdd: boolean;
}
