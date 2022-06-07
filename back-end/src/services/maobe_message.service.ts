import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from '../dtos/in/message.dto';
import { MaobeMessage } from '../models/maobe_message.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { MessageSnippetDto } from '../dtos/out/MessageSnippetDto.dto';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { plainToClass } from 'class-transformer';
import { UserService } from './user.service';
import { User } from '../models/user.entity';

@Injectable()
export class MaobeMessageService {
	@Inject(UserService)
    private readonly userService: UserService;
    constructor(
        @InjectRepository(MaobeMessage)
        private readonly messageRepository: Repository<MaobeMessage>,
		@InjectRepository(User)
        private readonly userRepository: Repository<User>,
	){}

/*
**create a new obj  of Message entity, store it in the repository
**return: dto that contains messageId
*/
	async createMessage(messageDto: MessageDto): Promise<MaobeMessage>
	{
		const new_message = new MaobeMessage();
		new_message.userId = messageDto.userId;
		new_message.sender = messageDto.sender;
		new_message.roomId = messageDto.channelIdDst;
		new_message.content = messageDto.contentToSend;
		await this.messageRepository.save(new_message);
//		const dto = plainToClass(MessageSnippetDto, new_message);
		//		return dto;
		return new_message;
	}

/*
** Show all the message no matter in which channel
** return (Message[])
*/
	async getMessage(): Promise<MaobeMessage[]>
	{
		return await this.messageRepository.find();
	}
/*
** requiry all message in the given channel_id
** :param (room_id :number) the given roomId
** return value: messages
*/
	async getRoomMessage(body: ParticipantDto): Promise<MaobeMessage[]>
	{
		const userId = body.userId;
		const roomId = body.roomId;
		const blockList: number[] = await this.userService.getBlockList(userId);
		const messages_in_room = await this.messageRepository
			.createQueryBuilder("message")
			.where("message.roomId = :id and message.userId != all (:blockList)", { id: roomId, blockList: blockList })
            .getMany();
		console.log(messages_in_room);
		return messages_in_room;
	}
/*
** Obtain the specific column in table message by requerying primary id
** :param (id:number)
** :return (Message): the obj of message entity, equally
** the column corresponding to the requerying id
*/
	findOne(id:number): Promise<MaobeMessage>
	{
		return this.messageRepository.findOne(id);
	}

}
