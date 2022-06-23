import { MessageService } from '../services/message.service';
import { Server } from 'socket.io';
import { MessageDto } from '../dtos/in/message.dto';
import { UserService } from '../services/user.service';
export declare class MessageGateway {
    private readonly messageService;
    private readonly userService;
    server: Server;
    constructor(messageService: MessageService, userService: UserService);
    createMessage(message: MessageDto): Promise<void>;
}
