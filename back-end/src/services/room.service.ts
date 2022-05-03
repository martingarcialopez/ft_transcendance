import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from '../dtos/in/room.dto';
import { RoomSnippetDto } from '../dtos/out/RoomSnippetDto.dto';
import { Room } from '../models/room.entity';
import { Participant } from '../models/participant.entity';
import { User } from '../models/user.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { JoinRoomDto } from '../dtos/in/JoinRoom.dto';


@Injectable()
export class RoomService {

	constructor(
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
		@InjectRepository(Participant) private participantRepository: Repository<Participant>,
    ){}

	/*
	** Create a new channel(room)
	** :param(RoomDto) the infos of the channel given by front
	** :return (RoomSnippetDto) dto contains new channel id and its name
	*/	async createRoom(roomDto: RoomDto): Promise<RoomSnippetDto>
	{
        const new_room = new Room();
		new_room.name = roomDto.name;
		new_room.typeChannel = roomDto.typeChannel;

		const password = roomDto.password;
		const saltOrRounds = 10;
		const hash = await bcrypt.hash(password, saltOrRounds);
		new_room.password = hash;

		new_room.owner = roomDto.owner;
		//		new_room.members = roomDto.members;
		await this.roomRepository.save(new_room);

		const new_participant = new Participant();
		new_participant.userId = 2;
		new_participant.roomId = new_room.id;
		await this.participantRepository.save(new_participant);

		const dto = plainToClass(RoomSnippetDto, new_room);
		return dto;
	}


	/*
	** Get all user in the given id room
	** :Param(room_Id: number)
	** return (an obj contains roomid, roomName, and all participants)
	*/
	async getRoom(room_Id: number): Promise<Room>
	{
		const room = await this.roomRepository.findOne(room_Id);
		const p = await this.roomRepository.createQueryBuilder("room")
			.select(["room.id", "room.name"])
			.leftJoinAndSelect("room.participants", "participant")
            .leftJoinAndSelect("participant.user", "user")
			.where("room.id = :room_Id", { room_Id: room_Id })
			.getOne();
		console.log('here in getRoom', p, 'and type of p is ', typeof p);
		return p;
	}

	/*
	** Delete the whole column corresponding to the id
	** :param (id:number) id is the primary key in room table
	** :return void
	*/
	async deleteRoom(id: number): Promise<void> {
        await this.roomRepository.delete(id);
    }

	async joinRoom(joinRoomDto: JoinRoomDto): Promise<boolean> {
		const room_Id: number = joinRoomDto.roomId;
		const entered_pw : string = joinRoomDto.entered_pw;

		const room_pw = await this.roomRepository.createQueryBuilder("room")
            .select(["room.password"])
			.where("room.id = :room_Id", { room_Id: room_Id })
			.getOne();

		if (await bcrypt.compare(entered_pw, room_pw['password']))
		{
			const new_participant = new Participant();
			new_participant.userId = joinRoomDto.userId;
			new_participant.roomId = room_Id;
			await this.participantRepository.save(new_participant);
			return true;
		}
		return false;
	}
}


/*https://stackoverflow.com/questions/53378667/cast-entity-to-dto*/
