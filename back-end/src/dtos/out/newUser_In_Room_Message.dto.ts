import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber, IsArray } from 'class-validator';
import { Message } from '../../models/message.entity';


@Exclude()
export class newUser_In_Room_Message {

	@Expose()
	@IsArray()
	@IsNumber({ allowNaN: false })
	public blockList: number[];

    @Expose()
	@IsArray()
	public message_history: Message[];

}
