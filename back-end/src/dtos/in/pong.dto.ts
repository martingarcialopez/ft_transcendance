import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PongDto {
	// Validates for a non-empty string
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
    @IsNotEmpty()
    public typeRoom: string;

	@IsNumber()
	@IsNotEmpty()
	public rank: number;


}
