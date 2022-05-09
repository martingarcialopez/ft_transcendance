import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomDto {
	// Validates for a non-empty string
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
    @IsNotEmpty()
    public typeRoom: string;

	@IsString()
    public password: string;

	@IsNumber()
	@IsNotEmpty()
	public creatorId: number;

	@IsArray()
	@IsNumber()
	public members:number[];

	@IsString()
	public avatar: string;

	// @IsNumber()
	// @IsNotEmpty()
	// public id: number;

	// @IsArray()
	// @IsNotEmpty()
	// public message: string[];
}
