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

/*
** Create a new obj of participant and store in the table
*/
	async createParticipant(participantDto: ParticipantDto): Promise<Participant> {
        const new_participant = new Participant();
		// new_participant.userID = participantDto.userID;
		// new_participant.roomID = participantDto.roomID;

		return this.participantRepository.save(new_participant);
    }

/*
 ** From the given userID, obtain infos of RoomId participated and corresponding RoomName
 ** :Param(userId:number)
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

/*
** Obtain the specific column in tab participant by requerying primary id
**/
	async getParticipant(id: number): Promise<Participant[]>
    {
        return await this.participantRepository.find({id});
    }




}
