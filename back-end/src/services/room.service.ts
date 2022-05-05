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
import { RoomPwDto } from '../dtos/in/room_password.dto';
import { UpdateAdminDto } from '../dtos/in/update_admin.dto';

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
		new_room.owner.push(roomDto.owner);
		//new_room.owner_id = roomDto.ownerId;
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

	async updateRoomPw(body: RoomPwDto): Promise<boolean> {
		let admin = await this.roomRepository.createQueryBuilder("room")
            .select(["room.owner"])
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		if (admin['owner'].indexOf(body.userName) != -1)
		{
			let room =  await this.roomRepository.createQueryBuilder("room")
			    .where("room.id = :room_Id", { room_Id: body.roomId })
				.getOne();
			console.log('origin: ', room['password'], body['password']);
			let new_hashed_password = await this.get_hash_pw(body['password']);
			room['password'] = new_hashed_password;
			await this.roomRepository.save(room);
			return true;
//			console.log(await bcrypt.compare('888', room['password']));//should be true
		}
		return false;
	}

//NEED TO CHANGE VOID->BOOLEAN IF DELETE PASSWORD
	async deleteRoomPw(body: RoomPwDto): Promise<void> {
		let admin = await this.roomRepository.createQueryBuilder("room")
            .select(["room.owner"])
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		//user does not have the right
		if (admin['owner'].indexOf(body.userName) != -1)
			return ;
		let room =  await this.roomRepository.createQueryBuilder("room")
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		room['password'] = null;
		await this.roomRepository.save(room);
		console.log('here room', room);
		//TEST IS WORKING?
		room =  await this.roomRepository.createQueryBuilder("room")
			.select(["room.password"])
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		 console.log('NOW room', room);
	}

	async get_hash_pw(password: string): Promise<string> {
		const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
	}

	async get_RoomAdmins(roomId: number): Promise<string[]> {
	let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.owner"])
            .where("room.id = :room_Id", { room_Id: roomId })
        .getOne();
		return room.owner;
	}

	//change userName -> userId LATER
	async userIsAdmin(roomId: number, userName: string) : Promise<boolean> {
		let admins = await this.get_RoomAdmins(roomId);
		console.log('admins is here ', admins.indexOf(userName));
		//return false;
		return await admins.indexOf(userName) != -1;
	}

	async manageAdmin(body: UpdateAdminDto): Promise<void> {
		let is_already_admin = await this.userIsAdmin(body.roomId, body.userName);
		let admins = await this.get_RoomAdmins(body.roomId);
		if (body['toAdd'] == true && is_already_admin == false)
		{
			console.log('i am here', admins);
			admins.push(body.userName);
		}
		//remove this admin
		else if (body['toAdd'] == false && is_already_admin == true)
		{
			var index = admins.indexOf(body.userName);
			admins.splice(index, 1);
		}
		else
			return ;
		await this.roomRepository
			.createQueryBuilder()
			.update(Room)
			.set({ owner: admins })
			.where("id = :id", { id: body.roomId })
			.execute();
		console.log('i am here', admins);
	}

}


/*https://stackoverflow.com/questions/53378667/cast-entity-to-dto*/
