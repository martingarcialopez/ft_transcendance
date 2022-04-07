import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatDto } from '../dtos/in/chat.dto';
import { Chat } from '../models/chat.entity';

@Injectable()
export class ChatService {

    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ) {}


    saveChat(chatDto: ChatDto): Promise<Chat> {

        const chat = new Chat();

		chat.id = chatDto.id;
		chat.name = chatDto.name;
		chat.content = chatDto.content;

        return this.chatRepository.save(chat);
    }

	//show all the chat
	getChat(): Promise<Chat[]>
		{
			return this.chatRepository.find();
		}
	findOne(id:string): Promise<Chat>
		{
			return this.chatRepository.findOne(id);
		}
    async deleteChat(id: string): Promise<void> {
        await this.chatRepository.delete(id);
    }


}
