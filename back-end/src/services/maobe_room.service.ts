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
import { RoomPwDto } from '../dtos/in/room_password.dto';
import { UpdateAdminDto } from '../dtos/in/update_admin.dto';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { newUser_In_Room_Message } from '../dtos/out/newUser_In_Room_Message.dto';
import { BanUserDto } from '../dtos/in/banUser.dto';
import { JoinRoomDto } from '../dtos/in/maobe_JoinRoom.dto';
import { UserService } from './user.service';
import { MaobeMessageService } from './maobe_message.service';
import { MaobeParticipantService } from './maobe_participant.service';
import { AdminDto } from '../dtos/in/maobe_admin.dto';

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
		@InjectRepository(MaobeMessage) private readonly messagesRepository: Repository<MaobeMessage>,
    ){}

    async maobe_getMessages(roomId: number) : Promise<any> {
        let messages = await this.messagesRepository.createQueryBuilder("maobe_messages")
            .where("maobe_messages.roomId = :room_Id", { room_Id: roomId })
            .getMany();
        return messages;
    }

	/*get all the room the user participated and corresponding all participants in the room */
	async maobe_getJoinRooms(userId: number): Promise<any[]>
	{
		let blockList: number[] = await this.Mutual_blocklist(userId);
		const roomIds_obj: any[] = await this.roomRepository.createQueryBuilder()
			.select(["MaobeRoom.id"])
			.innerJoin(MaobeParticipant, "participant", `participant.roomId = MaobeRoom.id`)
			.where("participant.userId = :id", { id: userId })
			.andWhere("MaobeRoom.owner NOT IN (:...ids)", { ids: blockList })
			.getMany();

		const roomIds: number[] = []
		roomIds_obj.forEach((obj) => {
			roomIds.push(obj.id);
		})

		if (roomIds.length === 0)
			return [];

		let rooms: any = await this.roomRepository.createQueryBuilder("MaobeRoom")
			.select(["MaobeRoom", "p.mute_until", "u"])
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

				const now_date = new Date();

				users.forEach((obj2) => {
					const mute_date = new Date(obj2.p_mute_until);
					if (blockList.indexOf(obj2.u_id) === -1){
						tmp_participants.push({
							'userId': obj2.u_id,
							'username': obj2.u_username,
							'avatar': obj2.u_avatar,
							'isMute': mute_date > now_date,
						});
					}
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



	async joinRoom(userId: number, dto: JoinRoomDto): Promise<void> {
		if (dto.isProtected === true){
			const room_info = await this.roomRepository.createQueryBuilder("room")
				.select(["room.password"])
				.where("room.id = :room_Id", { room_Id: dto.roomId })
				.getOne();
			const res = await bcrypt.compare(dto.password, room_info['password'])
			if (res === false)
			{
				throw 'password is wrong';
			}
		}
		if ((await this.get_Room_Owner(dto.roomId)) === -2)
		{
				await this.roomRepository
					.createQueryBuilder()
					.update(MaobeRoom)
					.set({ owner: userId })
					.where("id = :id", { id: dto.roomId })
					.execute();
			}


	}

	/*
** Create a new obj of participant and store in the table, return to front updated info
*/
	async createParticipant(participantDto: ParticipantDto): Promise<any[]> {
		await this.participantService.createParticipant(participantDto);
		const roomIds = participantDto.roomId;
        let rooms: any = await this.roomRepository.createQueryBuilder("MaobeRoom")
            .select(["MaobeRoom", "u"])
            .leftJoin(MaobeParticipant, "p", `p.roomId = MaobeRoom.id`)
            .leftJoin(User, "u", `p.userId = u.id`)
			.where("MaobeRoom.id = :ids", { ids: roomIds })
            .getRawMany();

        let managedIndex: any[] = [];
        let ret: any[] = [];

        rooms.forEach((obj: any) => {
            if (managedIndex.indexOf(obj.MaobeRoom_id) === -1) {
                managedIndex.push(obj.MaobeRoom_id);

                const users = rooms.filter((obj2: any) => obj2.MaobeRoom_id === obj.MaobeRoom_id);
                const tmp_participants: any[] = [];

                const now_date = new Date();

                users.forEach((obj2) => {
                    const mute_date = new Date(obj2.p_mute_until);
                    tmp_participants.push({
                        'userId': obj2.u_id,
                        'username': obj2.u_username,
                        'avatar': obj2.u_avatar,
						'isMute': mute_date > now_date,
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
        return ret[0];
    }



	/*
	** Create a new channel(room)
	** :param(RoomDto) the infos of the channel given by front
	** :return (RoomSnippetDto) dto contains new channel id and its name
	*/	async maobe_createRoom(userId: number, roomDto: RoomDto): Promise<any | undefined>
	{
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
		const user = await this.userRepository.findOne(userId);
		if (users.length > 0)
		{
			users.forEach(async element => await this.participantService.createParticipant({'userId': element['id'], 'roomId': new_room.id}));

		}
		users.push(user);
		return {
            'id': new_room.id,
            'name': new_room.name,
            'typeRoom': new_room.typeRoom,
            'image': new_room.image,
            'owner': new_room.owner,
            'admin': new_room.admin,
            'participants': users,
			'is_protected': new_room.is_protected
        }
	}


	async get_AvailableUsers(userId: number) : Promise<User[]> {
		let blockList: number[] = await this.Mutual_blocklist(userId);
		blockList.push(userId);
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
		let banList  = await this.get_Room_banList(roomId);
		if (banList.length > 0)
			banList.forEach(element => blockList.push(element));
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
		const new_participants : MaobeParticipant[] = roomInfos.newParticipants.forEach(async element =>
			{
				await this.participantService.createParticipant({'userId': element['id'], 'roomId': roomInfos.roomId})
			}

																					   );
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

	async userIsAdmin(roomId: number, userId: number) : Promise<boolean> {
		let admins = await this.get_RoomAdmins(roomId);
		return await admins.indexOf(userId) != -1;
	}

	async setAsAdmin(dto: AdminDto): Promise<void> {
		if (dto.userId === undefined)
			throw ('sth went wrong');
		let admins = await this.get_RoomAdmins(dto.roomId);
		if (dto.toAdd === true)
			admins.push(dto.userId);
		else
		{
			let index = admins.indexOf(dto.userId);
			if (index !== -1)
				admins.splice(index, 1);
			else
				return ;
		}
		await this.roomRepository
			.createQueryBuilder()
			.update(MaobeRoom)
			.set({ admin: admins })
			.where("id = :id", { id: dto.roomId })
			.execute();
	}

	async get_Room_banList(roomId: number): Promise<number[]> {
	let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.banList"])
        .where("room.id = :room_Id", { room_Id: roomId })
        .getOne();
		return room.banList;
	}


	async blockUser(userId: number, b_userId:number) : Promise<void> {
		let block_list: number[]  = await this.userService.getBlockList(userId);
		if (block_list.indexOf(b_userId) !== -1)
			return ;
		block_list.push(b_userId);
		await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ blockList: block_list })
            .where("id = :id", { id: userId })
            .execute();
	}


/****get a list of userId block the user*****/
	async Blocklist_to_user(userId: number) : Promise<number[]> {
		let block_list: number[] = [];
		let users = await this.userRepository.createQueryBuilder("user")
			.select(["user.id"])
			.getMany();
		for(var i = 0; i<users.length; i++) {
			let user_block_list: number[] = await this.userService.getBlockList(users[i].id);
			if (user_block_list.includes(userId))
				block_list.push(users[i].id);
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
	async getDispoRooms(userId:number) : Promise<MaobeRoom[]> {
		let blockList: number[] = await this.Mutual_blocklist(userId);
		let joined_rooms = await this.participantRepository.createQueryBuilder("participant")
			.select("participant.roomId")
			.where("participant.userId = :id", { id: userId })
			.getMany();
		let joined_roomsIds = [];
		joined_rooms.forEach((obj) => {
			joined_roomsIds.push(obj.roomId);
		})
		 if (joined_roomsIds.length === 0)
		 	 joined_roomsIds.push(-1);
		var rooms = await this.roomRepository.createQueryBuilder("room")
			.leftJoin("room.participants", "participant")
			.where("room.typeRoom = :typeRoom", {typeRoom: 'public'})
			.andWhere("room.owner NOT IN (:...names) ", { names : blockList })
			.andWhere("room.id NOT IN (:...rid)", { rid: joined_roomsIds })
			.getMany();
		//filter room where user is banned
		for(var i = 0; i<rooms.length; i++) {
            if (rooms[i].banList.length !== 0){
				let banList: number[] = await this.get_Room_banList(rooms[i].id);
                if (banList.includes(userId)) {
					rooms.splice(i, 1);
				}
            }
        }
		return rooms;
	}

	async banUser(body: ParticipantDto) : Promise<void> {
		let roomId : number = body.roomId;
		let userIdToBan : number = body.userId;
		await this.participantService.leaveRoom({'userId': userIdToBan, 'roomId': roomId})
		let banList: number[] = await this.get_Room_banList(roomId);
		if ((await this.userIsAdmin(roomId, userIdToBan)) === true)/*remove admin of column if the user is baned*/
		{
			var admins: number[] = await this.get_RoomAdmins(roomId);
			var index = admins.indexOf(userIdToBan);
            admins.splice(index, 1);
			this.roomRepository.update({id: roomId}, {
			 	admin: admins})
		}
		if (banList.indexOf(userIdToBan) === -1 && userIdToBan !== null)/*add userid in ban_list*/
			banList.push(userIdToBan);
		await this.roomRepository
            .createQueryBuilder()
            .update(MaobeRoom)
            .set({ banList: banList })
            .where("id = :id", { id: roomId })
            .execute();
	}

	async OwnerLeaveRoom(body: ParticipantDto) : Promise<void> {
		let roomId : number = body.roomId;
		let owner = await this.get_Room_Owner(roomId);
		if (body.userId === owner){
			let participants = await this.participantService.getParticipant(roomId);
			let new_ownerID = -2;
			if (participants.length >= 1)
				new_ownerID = participants[0]['participant_userId'];
			await this.roomRepository
				.createQueryBuilder()
				.update(MaobeRoom)
				.set({ owner: new_ownerID })
				.where("id = :id", { id: body.roomId })
				.execute();

		}
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
		return room.owner;
	}

	async get_RoomAdmins(roomId: number): Promise<number[] | undefined> {
		let room = await this.roomRepository.createQueryBuilder("room")
            .select(["room.admin"])
            .where("room.id = :room_Id", { room_Id: roomId })
			.getOne();
        return room.admin;
    }

	async AdminleaveRoom(body: ParticipantDto): Promise<void> {
        let is_already_admin = await this.userIsAdmin(body.roomId, body.userId);
        if (is_already_admin == true)
        {
			let admins = await this.get_RoomAdmins(body.roomId);
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





}
