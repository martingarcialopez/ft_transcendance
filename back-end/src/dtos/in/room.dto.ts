import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomDto {
	// Validates for a non-empty string
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
    @IsNotEmpty()
    public type: string;

	@IsString()
    @IsNotEmpty()
    public owner: string;

	@IsString()
    @IsNotEmpty()
    public password: string;

	@IsArray()
	@IsNumber()
	public members:string[];


}
