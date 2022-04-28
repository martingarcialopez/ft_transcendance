import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomDto {
	// Validates for a non-empty string
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
    @IsNotEmpty()
    public typeChannel: string;

	@IsString()
    @IsNotEmpty()
    public owner: string;

	@IsString()
    @IsNotEmpty()
    public password: string;

	@IsArray()
	@IsNumber()
	public members:string[];

	// probably gonna have to delete this later down the road
	@IsNumber()
	@IsNotEmpty()
	public id: number;

	@IsArray()
	@IsNotEmpty()
	public message: string[];
}
