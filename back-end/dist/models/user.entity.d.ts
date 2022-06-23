import { Message } from './message.entity';
import { Participant } from './participant.entity';
export declare class User {
    id: number;
    login42: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    twofa: boolean;
    secret: string;
    avatar: string;
    isActive: boolean;
    blockList: number[];
    messages: Message[];
    participants: Participant[];
}
