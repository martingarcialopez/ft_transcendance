import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { MaobeParticipant } from '../models/maobe_participant.entity';
export declare class MaobeParticipantService {
    private readonly participantRepository;
    private roomService;
    constructor(participantRepository: Repository<MaobeParticipant>);
    createParticipant(participantDto: ParticipantDto): Promise<void>;
    getParticipant(id: number): Promise<MaobeParticipant[]>;
    leaveRoom(participantDto: ParticipantDto): Promise<void>;
    muteUser(participantDto: ParticipantDto): Promise<void>;
}
