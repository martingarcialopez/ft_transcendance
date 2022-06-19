import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../models/user.entity'
export class RoomDto {
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
    @IsNotEmpty()
    public typeRoom: string;

	@IsString()
    public password: string;

	@IsArray()
	public users: User[];

	@IsString()
    public image: string;
}
