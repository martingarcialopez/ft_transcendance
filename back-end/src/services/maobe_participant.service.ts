import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { MaobeParticipant } from '../models/maobe_participant.entity';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class MaobeParticipantService {

	constructor(
		@InjectRepository(MaobeParticipant)
        private readonly participantRepository: Repository<MaobeParticipant>,

    ){}

/*
** Create a new obj of participant and store in the table
*/
	async createParticipant(participantDto: ParticipantDto): Promise<RoomSnippetDto> {
        const new_participant = new MaobeParticipant();
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
	// async maobe_getJoinRooms(userId: number): Promise<any[]>
	// {
	// 	let rooms: any = await this.roomRepository.createQueryBuilder("maobe_room")
    //         .leftJoinAndSelect("maobe_room.participants", "maobe_participant")
    //         .leftJoinAndSelect("maobe_participant.user", "user")
    //         .getMany();


	// 	// const roomIds = await this.participantRepository
	// 	// 	.createQueryBuilder("maobe_participant")
	// 	// 	.leftJoinAndSelect("maobe_participant.room", "maobe_room")
	// 	// 	.select(["participant.roomId", "room.name"])
	// 	// 	.where("maobe_participant.userId = :id", { id: userId })
	// 	// 	.getRawMany();
	// 	return rooms;
	// }

/*
** Obtain the specific column in tab participant by requerying primary id
**/
	async getParticipant(id: number): Promise<MaobeParticipant[]>
    {
		console.log('HERE in the service of getParticipant room id is ', id);
        // let value =  await this.participantRepository.find({id});
		const value = await this.participantRepository.createQueryBuilder("participant")
			.select(["participant.userId"])
			.where("participant.roomId = :room_Id", { room_Id: id })
			.getRawMany();
		console.log(value);
		return value;
    }


	async leaveRoom(participantDto: ParticipantDto) : Promise<void> {
		let userId : number = participantDto.userId;
		let roomId : number = participantDto.roomId;
		console.log('participantDto ', participantDto, userId, roomId);
		const id = await this.participantRepository
            .createQueryBuilder("participant")
			.select(["participant.id"])
			.where("participant.userId = :userId AND participant.roomId = :roomId", { userId: userId, roomId: roomId })
            .getOne();
		console.log('id is', id);
		if (id != undefined)
			await this.participantRepository.delete(id);
	}


}
