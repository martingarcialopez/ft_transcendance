import { User } from './user.entity';
import { Room } from './room.entity';
export declare class Participant {
    id: number;
    user: User;
    userId: number;
    room: Room;
    roomId: number;
}
