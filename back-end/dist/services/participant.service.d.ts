import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { Participant } from '../models/participant.entity';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';
export declare class ParticipantService {
    private readonly participantRepository;
    constructor(participantRepository: Repository<Participant>);
    createParticipant(participantDto: ParticipantDto): Promise<RoomSnippetDto>;
    getUseridRooms(userId: number): Promise<RoomSnippetDto[]>;
    getParticipant(id: number): Promise<Participant[]>;
    leaveRoom(participantDto: ParticipantDto): Promise<void>;
}
