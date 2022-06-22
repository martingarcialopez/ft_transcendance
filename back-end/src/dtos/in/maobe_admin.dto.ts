import { IsNotEmpty, IsNumber, IsBoolean,IsOptional } from 'class-validator';

export class AdminDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    @IsNumber()
    @IsNotEmpty()
    public roomId: number;

	@IsBoolean()
	@IsNotEmpty()
	public toAdd: boolean;
}
