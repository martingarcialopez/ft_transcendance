import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from '../dtos/in/message.dto';
import { Message } from '../models/message.entity';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
	){}


	async saveMessage(messageDto: MessageDto): Promise<Message> {
		const message = new Message();
		message.name = messageDto.name;
		message.content = messageDto.content;
	    return this.messageRepository.save(message);
	}

	//show all the message
	async getMessage(): Promise<Message[]>
	{
		return await this.messageRepository.find();
	}
	findOne(id:string): Promise<Message>
	{
		return this.messageRepository.findOne(id);
	}
    async deleteMessage(id: string): Promise<void> {
        await this.messageRepository.delete(id);
    }


}
