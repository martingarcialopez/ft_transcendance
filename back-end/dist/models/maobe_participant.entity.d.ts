import { User } from './user.entity';
import { MaobeRoom } from './maobe_room.entity';
export declare class MaobeParticipant {
    id: number;
    mute_until: Date;
    user: User;
    userId: number;
    room: MaobeRoom;
    roomId: number;
}
