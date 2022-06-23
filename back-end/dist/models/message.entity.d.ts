import { User } from './user.entity';
import { Room } from './room.entity';
export declare class Message {
    id: number;
    sender: string;
    content: string;
    user: User;
    userId: number;
    room: Room;
    roomId: number;
}
