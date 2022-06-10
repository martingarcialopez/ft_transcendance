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

	/*get all the room the user participated and corresponding all participants in the room */
	async maobe_getJoinRooms(userId: number): Promise<any[]>
	{
		const roomIds_obj: any[] = await this.roomRepository.createQueryBuilder()
			.select(["MaobeRoom.id"])
			.innerJoin(MaobeParticipant, "participant", `participant.roomId = MaobeRoom.id`)
			.where("participant.userId = :id", { id: userId })
			.getMany();

		const roomIds: number[] = []
		roomIds_obj.forEach((obj) => {
			roomIds.push(obj.id);
		})

		if (roomIds.length === 0) {
			return [];
		}

		let rooms: any = await this.roomRepository.createQueryBuilder("MaobeRoom")
			.select(["MaobeRoom", "u"])
			.leftJoin(MaobeParticipant, "p", `p.roomId = MaobeRoom.id`)
			.leftJoin(User, "u", `p.userId = u.id`)
			.where("MaobeRoom.id IN (:...ids)", { ids: roomIds })
			.getRawMany();

		let managedIndex: any[] = [];
		let ret: any[] = [];

		rooms.forEach((obj: any) => {
			if (managedIndex.indexOf(obj.MaobeRoom_id) === -1) {
				managedIndex.push(obj.MaobeRoom_id);

				const users = rooms.filter((obj2: any) => obj2.MaobeRoom_id === obj.MaobeRoom_id);
				const tmp_participants: any[] = [];

				users.forEach((obj2) => {
					tmp_participants.push({
						'userId': obj2.u_id,
						'username': obj2.u_username,
						'avatar': obj2.u_avatar,
					});
				})
				ret.push(
					{
						'id': obj.MaobeRoom_id,
						'name': obj.MaobeRoom_name,
						'typeRoom': obj.MaobeRoom_typeRoom,
						'image': obj.MaobeRoom_image,
						'owner': obj.MaobeRoom_owner,
						'admin': obj.MaobeRoom_admin,
						'participants': tmp_participants
					}
				);
			}
		});
		return ret;
	}

	/*
	** Create a new channel(room)
	** :param(RoomDto) the infos of the channel given by front
	** :return (RoomSnippetDto) dto contains new channel id and its name
	*/	async maobe_createRoom(userId: number, roomDto: RoomDto): Promise<any | undefined>
	{
		console.log('roomDto:', roomDto.image, '---------------');
        const new_room = new MaobeRoom();

		/***CHANGE IMAGE***/
		if (roomDto.image === undefined || roomDto.image === null ||  roomDto.image.length === 0) {
			new_room.image = 'https://stickershop.line-scdn.net/stickershop/v1/product/7594755/LINEStorePC/main.png;compress=true';
		}
		else {
			new_room.image = roomDto.image;
		}

		new_room.name = roomDto.name;
		new_room.typeRoom = roomDto.typeRoom;
		console.log('roomDto.password |', roomDto.password, '|');
		if (roomDto.password.length > 0)
		{
			new_room.is_protected = true;
			const password = roomDto.password;
			const saltOrRounds = 10;
			const hash = await bcrypt.hash(password, saltOrRounds);
			new_room.password = hash;
		}
		else
			new_room.password = null;
		new_room.owner = userId;
		if(new_room.admin == null)
            new_room.admin = [];
		new_room.admin.push(userId);
		await this.roomRepository.save(new_room);
		await this.participantService.createParticipant({'userId': userId, 'roomId':  new_room.id});
		let users: User[] = roomDto.users;
		if (users.length > 0)
		{
			users.forEach(async element => await this.participantService.createParticipant({'userId': element['id'], 'roomId': new_room.id}));

		}
		return {
            'id': new_room.id,
            'name': new_room.name,
            'typeRoom': new_room.typeRoom,
            'image': new_room.image,
            'owner': new_room.owner,
            'admin': new_room.admin,
            'participants': users
        }
	}


	async get_AvailableUsers(userId: number) : Promise<User[]> {
		let blockList: number[] = await this.Mutual_blocklist(userId);
        let dispo_users: User[] = await this.userRepository.createQueryBuilder("user")
            .where("user.id NOT IN (:...list) ", { list : blockList })
            .getMany();
        return dispo_users;
	}

	/*get potentials users who are not in the room yet*/
	async getRoom_AvailableUsers(userId: number, roomId: number) :  Promise<User[] | any> {
		let blockList: number[] = await this.Mutual_blocklist(userId);
		let deja_member : MaobeParticipant[] = await this.participantRepository.createQueryBuilder("participant")
			.select(["participant.userId"])
			.where("participant.roomId = :room_Id", { room_Id: roomId })
			.getMany();
		deja_member.forEach(element => blockList.push(element.userId));

        let users: User[] = await this.userRepository.createQueryBuilder("user")
		    .where("user.id NOT IN (:...list) ", { list : blockList })
			.getMany();
		return users;
	}

	async maobe_updateRoom(roomInfos: any) : Promise<any> {
		let room = await this.roomRepository.createQueryBuilder("room")
            .where("room.id = :room_Id", { room_Id: roomInfos.roomId })
            .getOne();

		if (room === undefined){
			throw 'cannot find this room';
			return ;
		}

		var is_protected = false;
		var password = null;
		if (roomInfos['password'].length !== 0)
		{
			is_protected = true;
			password = await bcrypt.hash(roomInfos.password, 10);
		}

		await this.roomRepository
            .createQueryBuilder()
            .update(MaobeRoom)
            .set( {name: roomInfos.name, typeRoom: roomInfos.roomType,
				   is_protected: is_protected,
				   password: password})
            .where("id = :id", { id: roomInfos.roomId })
            .execute();
		/*add new participants*/
		const new_participants : MaobeParticipant[] = roomInfos.newParticipants.forEach(async element => await this.participantService.createParticipant({'userId': element['id'], 'roomId': roomInfos.roomId}));
	const update_room = await this.roomRepository.findOne(roomInfos.roomId);
		return {
			'id': update_room['id'],
			'name': update_room['name'],
			'typeRoom': update_room['typeRoom'],
			'is_protected': update_room['is_protected'],
			'image': update_room['image'],
			'owner': update_room['owner'],
			'admin': update_room['admin'],
			'participants': roomInfos.newParticipants,
			}

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

/*	async joinRoom(joinRoomDto: JoinRoomDto): Promise<boolean> {
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
	} */

/*	NO NEED
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
			let new_hashed_password = await this.get_hash_pw(body['password']);
			room['password'] = new_hashed_password;
			await this.roomRepository.save(room);
			return true;
		}
		return false;
	}*/

	async userIsAdmin(roomId: number, userId: number) : Promise<boolean> {
		let admins = await this.get_RoomAdmins(roomId);
		console.log('admins is here ', admins, admins.indexOf(userId));
		return await admins.indexOf(userId) != -1;
	}

// 	async manageAdmin(body: UpdateAdminDto): Promise<boolean> {

// 		let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
// 		let admins = await this.get_RoomAdmins(body.roomId);
// 		if (admins == undefined)/*no admin in this chat*/
// 			return false;
// 		if (admins.indexOf(body.userId) == -1) /*userId is not admin*/
// 			return false;
// 		const login: string = body.login;
// 		const user_info = await this.userId_fromLogin(login);
// 		if (user_info == undefined)
// 			return false;
// 		let other_userId: number = user_info['id'];
// 		const other_user_is_admin = await this.userIsAdmin(body.roomId, other_userId);
// 		if (body['toAdd'] == true && other_user_is_admin == false)
// 			admins.push(other_userId);
// 		//remove this admin
// 		else if (body['toAdd'] == false && other_user_is_admin == true)
// 		{
// 			var index = admins.indexOf(other_userId);
// 			admins.splice(index, 1);
// 		}
// 		await this.roomRepository
// 			.createQueryBuilder()
// 			.update(MaobeRoom)
// 			.set({ admin: admins })
// 			.where("id = :id", { id: body.roomId })
// 			.execute();
// 		return true;
// }

	async AdminleaveRoom(body: ParticipantDto): Promise<void> {
		console.log('AdminleaveRoom');
        let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
        let admins = await this.get_RoomAdmins(body.roomId);
        if (is_already_admin == true)
        {
            var index = admins.indexOf(body.userId);
            admins.splice(index, 1);
        await this.roomRepository
            .createQueryBuilder()
            .update(MaobeRoom)
            .set({ admin: admins })
            .where("id = :id", { id: body.roomId })
            .execute();
		}
    }

	async get_Room_banList(roomId: number): Promise<number[]> {
	let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.banList"])
        .where("room.id = :room_Id", { room_Id: roomId })
        .getOne();
		console.log('in get_RoomAdmins ', room , room.owner);
		return room.banList;
	}


/****get a list of userId block the user*****/
	async Blocklist_to_user(userId: number) : Promise<number[]> {
		let block_list: number[] = [];
		let rooms: MaobeRoom[] = await this.roomRepository.createQueryBuilder("room")
			.select(["room.owner"])
			.getMany();
		for(var i = 0; i<rooms.length; i++) {
			if (rooms[i].owner != userId){
				let owner_block_list: number[] = await this.userService.getBlockList(rooms[i].owner);
				if (owner_block_list.includes(userId))
					block_list.push(rooms[i].owner);
			}
		}
		return block_list;
	}

	async Mutual_blocklist(userId: number) : Promise<number[]> {
		let block_list_to_user : number[] = await this.Blocklist_to_user(userId);
		let user_block_list_to_other: number[]  = await this.userService.getBlockList(userId);
		let list_block : number[] = [...block_list_to_user, ...user_block_list_to_other];
		let unique_block_list : number[] = [...new Set(list_block)];
		if (unique_block_list.length == 0) {
			unique_block_list.push(-1);
		}
		return unique_block_list;

	}
	async F_getRoomsDispo(userId:number) : Promise<MaobeRoom[]> {
		userId = 3;
		let blockList: number[] = await this.Mutual_blocklist(userId);
		let dispo_rooms: MaobeRoom[] = await this.roomRepository.createQueryBuilder("room")
			.select(["room.id"])
			.leftJoin("room.participants", "participant")
			.where("room.typeRoom = :typeRoom", {typeRoom: 'public'})
			.andWhere("room.owner NOT IN (:...names) ", { names : blockList })
			.andWhere("participant.userId != :id", { id: userId })
			.getMany();
		return dispo_rooms;
	}

	async banUser(body: BanUserDto) : Promise<void> {
		let roomId : number = 2;//body.roomId;
		let userId : number = 5;//body.userId;
		let userIdToBan : number = 3;//body.userIdToBan;
		let ownerId : number = await this.get_Room_Owner(roomId);
		let res = await this.participantRepository.findOne({ userId: userIdToBan, roomId: roomId });
		if (res == undefined)
		{
			throw 'This user is not in the room';
			return ;
		}
		//user does not have right OR baned person is admin/owner
		if (userIdToBan == ownerId)
		{
			throw 'Cannot ban owner of the room';
			return ;
		}
		if (await this.userIsAdmin(roomId, userId) == false)
		{
			throw 'You are not admin, so you cannot ban';
			return ;
		}
		await this.participantService.leaveRoom({'userId': userIdToBan, 'roomId': roomId})
		let banList: number[] = await this.get_Room_banList(roomId);
		if (await this.userIsAdmin(roomId, userIdToBan) == true)/*remove admin of column if the user is baned*/
		{
			var admins: number[] = await this.get_RoomAdmins(roomId);
			var index = admins.indexOf(userIdToBan);
            admins.splice(index, 1);
			this.roomRepository.update({id: roomId}, {
			 	admin: admins})
		}
		if (banList.indexOf(userIdToBan) == -1)/*add userid in ban_list*/
			banList.push(userIdToBan);
		await this.roomRepository
            .createQueryBuilder()
            .update(MaobeRoom)
            .set({ banList: banList })
            .where("id = :id", { id: roomId })
            .execute();
//		console.log(await this.findOne(2));
	}

	/*----------------------------FUNCTION-----------------------*/

	async findOne(id: number): Promise<MaobeRoom> {
		return this.roomRepository.findOne(id);
	}

	async get_Room_Owner(roomId: number): Promise<number> {
	let room = await this.roomRepository.createQueryBuilder("room")
        .select(["room.owner"])
        .where("room.id = :room_Id", { room_Id: roomId })
        .getOne();
		console.log('in get_RoomOwner ', room , room.owner);
		return room.owner;
	}

	async get_RoomAdmins(roomId: number): Promise<number[] | undefined> {
		let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.admin"])
            .where("room.id = :room_Id", { room_Id: roomId })
			.getOne();
        return room.admin;
    }



}


/*https://stackoverflow.com/questions/53378667/cast-entity-to-dto*/
