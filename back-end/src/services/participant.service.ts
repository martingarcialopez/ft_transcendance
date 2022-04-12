import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { Participant } from '../models/participant.entity';

@Injectable()
export class ParticipantService {

	constructor(
		@InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,

    ){}

	async createParticipant(participantDto: ParticipantDto): Promise<Participant> {
        const new_participant = new Participant();
		// new_participant.userID = participantDto.userID;
		// new_participant.roomID = participantDto.roomID;

		return this.participantRepository.save(new_participant);
    }

	async getParticipant(id: number): Promise<Participant[]>
    {
        return await this.participantRepository.find({id});
    }

	async deleteParticipant(id: number): Promise<void> {
        await this.participantRepository.delete(id);
    }



}
