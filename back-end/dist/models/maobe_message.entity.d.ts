import { User } from './user.entity';
import { MaobeRoom } from './maobe_room.entity';
export declare class MaobeMessage {
    id: number;
    content: string;
    createdDate: string;
    user: User;
    userId: number;
    room: MaobeRoom;
    roomId: number;
}
