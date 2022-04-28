import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { Participant } from '../models/participant.entity';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';

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

/*
 ** From the given userID, obtain infos of RoomId participated and corresponding RoomName
 ** Parameter(userId:number)
** Return type (RoomSnippetDto) that contain room_id + room_name
*/
	async getUseridRooms(userId: number): Promise<RoomSnippetDto[]>
	{
		const roomIds = await this.participantRepository
			.createQueryBuilder("participant")
			.leftJoinAndSelect("participant.room", "room")
			.select(["participant.roomId", "room.name"])
			.where("participant.userId = :id", { id: userId })
			.getRawMany();
		return roomIds;
	}

	async getParticipant(id: number): Promise<Participant[]>
    {
        return await this.participantRepository.find({id});
    }

	async deleteParticipant(id: number): Promise<void> {
        await this.participantRepository.delete(id);
    }



}
