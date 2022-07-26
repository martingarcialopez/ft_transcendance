import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { Participant } from '../models/participant.entity';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class ParticipantService {

	constructor(
		@InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,

    ){}

/*
** Create a new obj of participant and store in the table
*/
	async createParticipant(participantDto: ParticipantDto): Promise<RoomSnippetDto> {
        const new_participant = new Participant();
		new_participant.userId = participantDto.userId;
		new_participant.roomId = participantDto.roomId;
		await this.participantRepository.save(new_participant);
		const dto = plainToClass(RoomSnippetDto, new_participant);
		return dto;
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
        // let value =  await this.participantRepository.find({id});
		const value = await this.participantRepository.createQueryBuilder("participant")
			.select(["participant.userId"])
			.where("participant.roomId = :room_Id", { room_Id: id })
			.getRawMany();
		return value;
    }


	async leaveRoom(participantDto: ParticipantDto) : Promise<void> {
		let userId : number = participantDto.userId;
		let roomId : number = participantDto.roomId;
		const id = await this.participantRepository
            .createQueryBuilder("participant")
			.select(["participant.id"])
			.where("participant.userId = :userId AND participant.roomId = :roomId", { userId: userId, roomId: roomId })
            .getOne();
		if (id != undefined)
			await this.participantRepository.delete(id);
	}


}
