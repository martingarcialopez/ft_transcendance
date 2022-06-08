import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user.entity';
import { MaobeRoom } from '../models/maobe_room.entity';
import { MaobeParticipant } from '../models/maobe_participant.entity';
import { MaobeMessage } from '../models/maobe_message.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { plainToClass } from 'class-transformer';

import * as bcrypt from 'bcrypt';
import { RoomDto } from '../dtos/in/maobe_room.dto';
import { JoinRoomDto } from '../dtos/in/JoinRoom.dto';
import { RoomPwDto } from '../dtos/in/room_password.dto';
import { UpdateAdminDto } from '../dtos/in/update_admin.dto';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { newUser_In_Room_Message } from '../dtos/out/newUser_In_Room_Message.dto';
import { BanUserDto } from '../dtos/in/banUser.dto';
import { UserService } from './user.service';
import { MaobeMessageService } from './maobe_message.service';
import { MaobeParticipantService } from './maobe_participant.service';

@Injectable()
export class MaobeRoomService {
	@Inject(UserService)
	private readonly userService: UserService;
	@Inject(MaobeMessageService)
	private readonly messageService: MaobeMessageService;
	@Inject(MaobeParticipantService)
	private readonly participantService: MaobeParticipantService;
	constructor(
        @InjectRepository(MaobeRoom) private readonly roomRepository: Repository<MaobeRoom>,
		@InjectRepository(MaobeParticipant) private readonly participantRepository: Repository<MaobeParticipant>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

	async maobe_getJoinRooms(userId: number): Promise<any[]>
	{
		let rooms: any = await this.roomRepository.createQueryBuilder("room")
		    .leftJoinAndSelect("room.participants", "participant")
            .leftJoinAndSelect("participant.user", "user")
//			.select(["room.id","room.typeRoom","room.image", "room.name"])
			.where("participant.userId = :id", { id: userId })
            .getMany();
		return rooms;
	}

	/*
	** Create a new channel(room)
	** :param(RoomDto) the infos of the channel given by front
	** :return (RoomSnippetDto) dto contains new channel id and its name
	*/	async maobe_createRoom(userId: number, roomDto: RoomDto): Promise<MaobeRoom| undefined>
	{
		console.log('roomDto:', roomDto, '---------------');
		console.log(roomDto.password == null);
        const new_room = new MaobeRoom();
		/***CHANGE IMAGE***/
		new_room.image = '';
		new_room.name = roomDto.roomName;
		new_room.typeRoom = roomDto.typeRoom;
		console.log('roomDto.password |', roomDto.password, '|');
		if (roomDto.password.length > 0)
		{
			console.log('createRoom password');
			new_room.is_protected = true;
			const password = roomDto.password;
			const saltOrRounds = 10;
			const hash = await bcrypt.hash(password, saltOrRounds);
			new_room.password = hash;
		}
		new_room.owner = userId;
		if(new_room.admin == null)
            new_room.admin = [];
		new_room.admin.push(userId);
		await this.roomRepository.save(new_room);
		console.log('---------BOID0----------');
		await this.participantService.createParticipant({'userId': userId, 'roomId':  new_room.id});
		console.log('---------BOID1----------');
		let userIds: User[] = roomDto.users;
		console.log('---------BOID2----------');
		if (userIds.length > 0)
		{
			console.log('----------BOID3-------userIds: ', userIds);
			userIds.forEach(async element => await this.participantService.createParticipant({'userId': element['userId'], 'roomId': new_room.id}));

		}
		console.log('-----------\n\n' , 'new_room', new_room , '\n\n');
		return new_room;
	}


	/*
	** Get all user in the given id room
	** :Param(room_Id: number)
	** return (an obj contains roomid, roomName, and all participants)
	*/
	async getRoom(room_Id: number): Promise<MaobeRoom>
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

	async participant_already_exist(participantDto: ParticipantDto)
	{
		const userId : number = participantDto.userId;
		const roomId: number = participantDto.roomId;
		let res = await this.participantRepository.findOne({ userId: userId, roomId: roomId });
		if (res)
			return true;
		return false;
	}

	async joinRoom(joinRoomDto: JoinRoomDto): Promise<boolean> {
		console.log('joinRoomDto: ', joinRoomDto);

		const typeRoom: string = joinRoomDto.typeRoom;
		const userId : number = joinRoomDto.userId;
		const roomId: number = joinRoomDto.roomId;
		let existing_user = false;
		if (typeRoom == 'public')
		{
			//if the person is already a number in the room
			existing_user = await this.participant_already_exist({'userId': userId, 'roomId': roomId});
			if (existing_user)
				return false;
			await this.participantService.createParticipant({'userId': userId, 'roomId': roomId});
			return true;
		}
		else if (typeRoom == 'private')
		{
			console.log('enter in private room', roomId, userId);
			let is_admin = await this.userIsAdmin(roomId, userId);

			console.log('is_admin? ', is_admin);
			if (is_admin == false)
				return false;
			const login: string = joinRoomDto.login;
			const invitee_info = await this.userId_fromLogin(login);
			console.log('login', login);
//			console.log('invitee_info is ', invitee_info);
			if (invitee_info == undefined)
				return false;
			const invite_id = invitee_info['id'];
			existing_user = await this.participant_already_exist({'userId': invite_id, 'roomId': roomId});
			if (existing_user || invite_id == userId)
				return false;
			await this.participantService.createParticipant({'userId': invite_id, 'roomId': roomId});
            return true;
		}
		else if (typeRoom == 'protected')
		{
			const entered_pw : string = joinRoomDto.password;
			const room_info = await this.roomRepository.createQueryBuilder("room")
				.select(["room.password"])
				.where("room.id = :room_Id", { room_Id: roomId })
				.getOne();
			if (await bcrypt.compare(entered_pw, room_info['password']))
			{
				existing_user = await this.participant_already_exist({'userId': userId, 'roomId': roomId});
				if (existing_user)
					return false;
				await this.participantService.createParticipant({'userId': joinRoomDto.userId, 'roomId': roomId});
				return true;
			}
		}
		return false;
	}

	async updateRoomPw(body: RoomPwDto): Promise<boolean> {
		console.log(body);
		let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.admin"])
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		if (room && room['admin'].indexOf(body.userId) != -1)
		{
			let room =  await this.roomRepository.createQueryBuilder("room")
			    .where("room.id = :room_Id", { room_Id: body.roomId })
				.getOne();
	//		console.log('origin: ', room['password'], body['password']);
			let new_hashed_password = await this.get_hash_pw(body['password']);
			room['password'] = new_hashed_password;
			await this.roomRepository.save(room);
			return true;
//			console.log(await bcrypt.compare('666', room['password']));//should be true
		}
		return false;
	}

//NEED TO CHANGE VOID->BOOLEAN IF DELETE PASSWORD
	async deleteRoomPw(body: RoomPwDto): Promise<boolean> {
		// console.log('in svc of deleteRoomPw');
		// let admin = await this.roomRepository.createQueryBuilder("room")
        //     .select(["room.owner"])
        //     .where("room.id = :room_Id", { room_Id: body.roomId })
        //     .getOne();
		// console.log(admin, admin['owner'], body.userId);
		// //user does not have the right
		// if (admin['owner'].indexOf(body.userId) == -1)
		// {
		// 	console.log('il a pas le droit pour supprimer le pw');
		// 	return false;
		//}
		let room =  await this.roomRepository.createQueryBuilder("room")
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		room['password'] = null;
		if (room['typeRoom'] == 'protected')
			room['typeRoom'] = 'public';
		await this.roomRepository.save(room);
		console.log('here room', room);
		//TEST IS WORKING?
		room =  await this.roomRepository.createQueryBuilder("room")
//			.select(["room.password"])
            .where("room.id = :room_Id", { room_Id: body.roomId })
            .getOne();
		console.log('NOW room', room);
		return true;
	}

	async get_hash_pw(password: string): Promise<string> {
		const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
	}

	async get_RoomAdmins(roomId: number): Promise<number[] | undefined> {
		let room = await this.roomRepository.createQueryBuilder("maoberoom")
            .select(["maoberoom.admin"])
            .where("maoberoom.id = :room_Id", { room_Id: roomId })
			.getOne();
        return room.admin;
    }

	async userIsAdmin(roomId: number, userId: number) : Promise<boolean> {
		let admins = await this.get_RoomAdmins(roomId);
		console.log('admins is here ', admins, admins.indexOf(userId));
		//return false;
		return await admins.indexOf(userId) != -1;
	}

	async manageAdmin(body: UpdateAdminDto): Promise<boolean> {

		let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
		let admins = await this.get_RoomAdmins(body.roomId);
		if (admins == undefined)/*no admin in this chat*/
			return false;
		if (admins.indexOf(body.userId) == -1) /*userId is not admin*/
			return false;
		const login: string = body.login;
		const user_info = await this.userId_fromLogin(login);
		if (user_info == undefined)
			return false;
		let other_userId: number = user_info['id'];
		const other_user_is_admin = await this.userIsAdmin(body.roomId, other_userId);
		if (body['toAdd'] == true && other_user_is_admin == false)
			admins.push(other_userId);
		//remove this admin
		else if (body['toAdd'] == false && other_user_is_admin == true)
		{
			var index = admins.indexOf(other_userId);
			admins.splice(index, 1);
		}
		await this.roomRepository
			.createQueryBuilder()
			.update(MaobeRoom)
			.set({ admin: admins })
			.where("id = :id", { id: body.roomId })
			.execute();
		return true;
	}

	async AdminleaveRoom(body: ParticipantDto): Promise<void> {
		console.log('AdminleaveRoom');
        let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
        let admins = await this.get_RoomAdmins(body.roomId);
        //remove this admin
        if (is_already_admin == true)
        {
            var index = admins.indexOf(body.userId);
            admins.splice(index, 1);
		console.log('delete admin');
        await this.roomRepository
            .createQueryBuilder()
            .update(MaobeRoom)
            .set({ admin: admins })
            .where("id = :id", { id: body.roomId })
            .execute();
		}
    }

	async getRoomId(roomName: string): Promise<number> {
		let room : MaobeRoom =  await this.roomRepository.createQueryBuilder("maoberoom")
			.select("maoberoom.id")
			.where("maoberoom.name = :roomName", { roomName: roomName })
            .getOne();

		console.log('here room ', room);
		return room.id;

	}

	async IsRoomName_Unique(roomName: string): Promise<boolean> {
		console.log(roomName);
		let names: any = await this.roomRepository.createQueryBuilder("room")
			.select("room.id")
			.where("room.name = :room_name", { room_name: roomName })
			.getOne();

		if (names != undefined)//name exist deja
			return false;
		return true;
	}

	async allRoomInfos() : Promise<MaobeRoom[] | undefined> {
		let rooms: any = await this.roomRepository.createQueryBuilder("maoberoom")
			.leftJoinAndSelect("maoberoom.participants", "maobeparticipant")
		    .leftJoinAndSelect("maobeparticipant.user", "user")
            .getMany();
		return rooms;

	}

	async userId_fromLogin(login : string) : Promise<User | undefined> {

		console.log('login', login);
		const user_info = await this.userRepository.createQueryBuilder("user")
			.select(["user.id"])
			.where("user.login42 = :login", { login: login })
			.getOne();
		return user_info;
	}


	async get_Room_banList(roomId: number): Promise<number[]> {
	let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.banList"])
        .where("room.id = :room_Id", { room_Id: roomId })
        .getOne();
		console.log('in get_RoomAdmins ', room , room.owner);
		return room.banList;
	}


	async banUser(body: BanUserDto) : Promise<void> {
		let roomId : number = body.roomId;
		let user: User = await this.userId_fromLogin(body.userIdToMute);
		let userIdToBan : number = user['id'];
		let userId : number = body.userId;
		//user does not have right OR baned person is admin/owner
		if (await this.userIsAdmin(roomId, userId) == false || await this.userIsAdmin(roomId, userIdToBan) == true)
			throw 'no right to ban';
		await this.participantService.leaveRoom({'userId': userIdToBan, 'roomId': roomId})
		let banList: number[] = await this.get_Room_banList(roomId);
		banList.push(userIdToBan);
	}


}


/*https://stackoverflow.com/questions/53378667/cast-entity-to-dto*/
