import { Repository } from 'typeorm';
import { MessageDto } from '../dtos/in/message.dto';
import { Message } from '../models/message.entity';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { User } from '../models/user.entity';
export declare class MessageService {
    private readonly messageRepository;
    private readonly userRepository;
    private readonly userService;
    constructor(messageRepository: Repository<Message>, userRepository: Repository<User>);
    createMessage(messageDto: MessageDto): Promise<Message>;
    getMessage(): Promise<Message[]>;
    getRoomMessage(body: ParticipantDto): Promise<Message[]>;
    findOne(id: number): Promise<Message>;
}
