import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { MaobeParticipant } from '../models/maobe_participant.entity';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';
import { plainToClass } from 'class-transformer';
import { MaobeRoomService } from './maobe_room.service';

@Injectable()
export class MaobeParticipantService {
	@Inject(forwardRef(() => MaobeRoomService))
    private roomService: MaobeRoomService;

	constructor(
		@InjectRepository(MaobeParticipant)
        private readonly participantRepository: Repository<MaobeParticipant>,

    ){}


	async createParticipant(participantDto: ParticipantDto): Promise<void> {
        const new_participant = new MaobeParticipant();
        new_participant.userId = participantDto.userId;
        new_participant.roomId = participantDto.roomId;
        await this.participantRepository.save(new_participant);
	}

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
		const id = await this.participantRepository
            .createQueryBuilder("participant")
			.select(["participant.id"])
			.where("participant.userId = :userId", { userId: userId})
			.andWhere("participant.roomId = :roomId", {roomId: roomId })
			.getOne();
		console.log('what is id ', id);
		if (id !== undefined)
		{
			console.log('what is id ', id);
			await this.participantRepository.delete(id);
		}
}

	async muteUser(userId: number, roomId: number) : Promise<void> {
		let time: number = 10;
		let res = await this.participantRepository.findOne({ userId: userId, roomId: roomId });
		var current_time = new Date();
		var time_until_mute = new Date();
		time_until_mute.setTime(current_time.getTime() + (time * 60 * 1000));
		this.participantRepository.update({id: res['id']}, {
            mute_until: time_until_mute});
	}



}
