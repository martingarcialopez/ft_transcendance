import { User } from '../../models/user.entity';
export declare class RoomDto {
    name: string;
    typeRoom: string;
    password: string;
    users: User[];
    image: string;
}
