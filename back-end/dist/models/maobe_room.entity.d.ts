import { MaobeMessage } from './maobe_message.entity';
import { MaobeParticipant } from './maobe_participant.entity';
export declare class MaobeRoom {
    id: number;
    name: string;
    typeRoom: string;
    is_protected: boolean;
    password: string;
    image: string;
    owner: number;
    admin: number[];
    banList: number[];
    messages: MaobeMessage[];
    participants: MaobeParticipant[];
}
