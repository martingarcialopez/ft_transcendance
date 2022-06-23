import { Repository } from 'typeorm';
import { MaobeMessageDto } from '../dtos/in/maobe_message.dto';
import { MaobeMessage } from '../models/maobe_message.entity';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { User } from '../models/user.entity';
export declare class MaobeMessageService {
    private readonly messageRepository;
    private readonly userRepository;
    private readonly userService;
    constructor(messageRepository: Repository<MaobeMessage>, userRepository: Repository<User>);
    createMessage(messageDto: MaobeMessageDto): Promise<MaobeMessage>;
    getMessage(): Promise<MaobeMessage[]>;
    getRoomMessage(body: ParticipantDto): Promise<MaobeMessage[]>;
    findOne(id: number): Promise<MaobeMessage>;
}
