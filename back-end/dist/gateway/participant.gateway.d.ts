import { ParticipantService } from '../services/participant.service';
import { Socket, Server } from 'socket.io';
import { ParticipantDto } from '../dtos/in/participant.dto';
export declare class ParticipantGateway {
    private readonly participantService;
    server: Server;
    constructor(participantService: ParticipantService);
    createParticipant(socket: Socket, participant: ParticipantDto): Promise<void>;
    getParticipant(room_id: number): Promise<void>;
    getUseridRooms(userId: number): Promise<void>;
}
