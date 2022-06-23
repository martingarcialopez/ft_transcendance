import { Message } from './message.entity';
import { Participant } from './participant.entity';
export declare class Room {
    id: number;
    name: string;
    typeRoom: string;
    password?: string;
    owner: number[];
    banList: number[];
    messages: Message[];
    participants: Participant[];
}
