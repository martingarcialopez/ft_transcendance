import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { MaobeRoom } from '../models/maobe_room.entity';
import { MaobeParticipant } from '../models/maobe_participant.entity';
import { MaobeMessage } from '../models/maobe_message.entity';
import { RoomDto } from '../dtos/in/maobe_room.dto';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { JoinRoomDto } from '../dtos/in/maobe_JoinRoom.dto';
import { AdminDto } from '../dtos/in/maobe_admin.dto';
export declare class MaobeRoomService {
    private readonly roomRepository;
    private readonly participantRepository;
    private readonly userRepository;
    private readonly messagesRepository;
    private readonly userService;
    private readonly messageService;
    private readonly participantService;
    constructor(roomRepository: Repository<MaobeRoom>, participantRepository: Repository<MaobeParticipant>, userRepository: Repository<User>, messagesRepository: Repository<MaobeMessage>);
    maobe_getMessages(roomId: number): Promise<any>;
    maobe_getJoinRooms(userId: number): Promise<any[]>;
    joinRoom(dto: JoinRoomDto): Promise<void>;
    createParticipant(participantDto: ParticipantDto): Promise<any[]>;
    maobe_createRoom(userId: number, roomDto: RoomDto): Promise<any | undefined>;
    get_AvailableUsers(userId: number): Promise<User[]>;
    getRoom_AvailableUsers(userId: number, roomId: number): Promise<User[] | any>;
    maobe_updateRoom(roomInfos: any): Promise<any>;
    getRoom(room_Id: number): Promise<MaobeRoom>;
    deleteRoom(id: number): Promise<void>;
    participant_already_exist(participantDto: ParticipantDto): Promise<boolean>;
    userIsAdmin(roomId: number, userId: number): Promise<boolean>;
    setAsAdmin(dto: AdminDto): Promise<void>;
    get_Room_banList(roomId: number): Promise<number[]>;
    blockUser(userId: number, b_userId: number): Promise<void>;
    Blocklist_to_user(userId: number): Promise<number[]>;
    Mutual_blocklist(userId: number): Promise<number[]>;
    getDispoRooms(userId: number): Promise<MaobeRoom[]>;
    banUser(body: ParticipantDto): Promise<void>;
    findOne(id: number): Promise<MaobeRoom>;
    get_Room_Owner(roomId: number): Promise<number>;
    get_RoomAdmins(roomId: number): Promise<number[] | undefined>;
    AdminleaveRoom(body: ParticipantDto): Promise<void>;
}
