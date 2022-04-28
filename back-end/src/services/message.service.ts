import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from '../dtos/in/message.dto';
import { Message } from '../models/message.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { MessageSnippetDto } from '../dtos/in/MessageSnippetDto.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
	){}


	async createMessage(messageDto: MessageDto): Promise<MessageSnippetDto>
	{
		const new_message = new Message();
		/*mettre en dur le userId*/
	//	new_message.userId = 2;
		new_message.roomId = messageDto.channelIdDst ;
		new_message.sender = messageDto.fromUser;
		new_message.content = messageDto.contentToSend;
		new_message.room_name = messageDto.channelName;
		await this.messageRepository.save(new_message);
		const dto = plainToClass(MessageSnippetDto, new_message);
		return dto;
	}

	/*show all the message*/
	async getMessage(): Promise<Message[]>
	{
		return await this.messageRepository.find();
	}

	async getRoomMessage(room_id:number): Promise<Message[]>
	{
		//	return await this.messageRepository.find();
		const messages_in_room = await this.messageRepository
			.createQueryBuilder("message")
			.where("message.roomId = :id", { id: room_id })
            .getMany();
		console.log(messages_in_room);
		return messages_in_room;
	}

	findOne(id:string): Promise<Message>
	{
		return this.messageRepository.findOne(id);
	}
    async deleteMessage(id: number): Promise<void> {
        await this.messageRepository.delete(id);
    }


}
