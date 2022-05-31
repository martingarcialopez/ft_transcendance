import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { Participant } from '../models/participant.entity';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';
import { plainToClass } from 'class-transformer';
import { BanUserDto } from '../dtos/in/banUser.dto';
import { RoomService } from './room.service';

@Injectable()
export class ParticipantService {
	@Inject(forwardRef(() => RoomService))
    private roomService: RoomService;

	constructor(
		@InjectRepository(Participant)
		private readonly participantRepository: Repository<Participant>,
	){}

// export class ParticipantService {
// 	@Inject(RoomService)
//     private readonly roomService: RoomService;

// 	constructor(
// 		@InjectRepository(Participant)
//         private readonly participantRepository: Repository<Participant>,

//     ){}

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

	async muteUser(body: BanUserDto) : Promise<void> {
		let roomId : number = 1;//body.roomId;
		let userId : number = 1;//body.userId;
		let userIdToMute : number = 5;//body.userIdToBan;
		let ownerId : number = await this.roomService.get_Room_Owner(roomId);
		let time: number = 65;//body.time;

		let res = await this.participantRepository.findOne({ userId: userIdToMute, roomId: roomId });
		console.log('res ', res);
		if (res == undefined)
		{
			throw 'This user is not in the room';
			return ;
		}
		if (userIdToMute == ownerId)
		{
			throw 'Cannot mute owner of the room';
			return ;
		}
		if (await this.roomService.userIsAdmin(roomId, userId) == false)
		{
			throw 'You are not admin, so you cannot mute';
            return ;
		}
		var current_time = new Date();
		var time_until_mute = new Date();
		time_until_mute.setTime(current_time.getTime() + (time * 60 * 1000));
		this.participantRepository.update({id: res['id']}, {
            mute_until: time_until_mute});


	}






}
