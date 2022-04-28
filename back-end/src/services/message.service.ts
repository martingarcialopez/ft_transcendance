import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dtos/in/message.dto';
import { Message } from '../models/message.entity';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}


    createMessage(createMessageDto: CreateMessageDto): Promise<Message> {

        const message = new Message();
		message.user_id = createMessageDto.user_id;
		message.created_on = Date.now().toString();
		message.content = createMessageDto.content;

        return this.messageRepository.save(message);
    }

	//show all the message
	getMessage(): Promise<Message[]>
		{
			return this.messageRepository.find();
		}
	findOne(id:string): Promise<Message>
		{
			return this.messageRepository.findOne(id);
		}
    async deleteMessage(id: string): Promise<void> {
        await this.messageRepository.delete(id);
    }


}
