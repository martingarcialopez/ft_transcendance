import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from '../dtos/in/message.dto';
import { Message } from '../models/message.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { MessageSnippetDto } from '../dtos/out/MessageSnippetDto.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
	){}

/*
**create a new obj  of Message entity, store it in the repository
**return: dto that contains messageId
*/
	async createMessage(messageDto: MessageDto): Promise<MessageSnippetDto>
	{
		const new_message = new Message();
		new_message.userId = 2;
		new_message.roomId = messageDto.channelIdDst;
		new_message.sender = messageDto.fromUser;
		new_message.content = messageDto.contentToSend;
		new_message.room_name = messageDto.channelName;
		await this.messageRepository.save(new_message);
		const dto = plainToClass(MessageSnippetDto, new_message);
		return dto;
	}

/*
** Show all the message no matter in which channel
** return (Message[])
*/
	async getMessage(): Promise<Message[]>
	{
		return await this.messageRepository.find();
	}
/*
** requiry all message in the given channel_id
** :param (room_id :number) the given roomId
** return value: messages
*/
	async getRoomMessage(room_id:number): Promise<Message[]>
	{
		const messages_in_room = await this.messageRepository
			.createQueryBuilder("message")
			.where("message.roomId = :id", { id: room_id })
            .getMany();
		return messages_in_room;
	}
/*
** Obtain the specific column in table message by requerying primary id
** :param (id:number)
** :return (Message): the obj of message entity, equally
** the column corresponding to the requerying id
*/
	findOne(id:number): Promise<Message>
	{
		return this.messageRepository.findOne(id);
	}

}
