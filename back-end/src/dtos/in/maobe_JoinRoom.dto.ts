import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class JoinRoomDto {

	@IsNumber()
	@IsNotEmpty()
    public roomId: number;

	@IsBoolean()
	isProtected: boolean;

	@IsString()
	@IsOptional()
	public password: string;

}
