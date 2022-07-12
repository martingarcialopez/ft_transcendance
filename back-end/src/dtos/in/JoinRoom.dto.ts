import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class JoinRoomDto {

	@IsNumber()
	@IsNotEmpty()
	public userId: number;

	@IsNumber()
	@IsNotEmpty()
    public roomId: number;

	@IsString()
	@IsNotEmpty()
	public typeRoom: string;

	@IsString()
	@IsOptional()
	public password?: string;

	@IsString()
	@IsOptional()
    public login?: string;
}
