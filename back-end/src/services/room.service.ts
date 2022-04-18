import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from '../dtos/in/room.dto';
import { Room } from '../models/room.entity';
import { Participant } from '../models/participant.entity';
import { User } from '../models/user.entity';

@Injectable()
export class RoomService {

	constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ){}


	async createRoom(roomDto: RoomDto): Promise<Room> {
        const new_room = new Room();
		new_room.room_name = roomDto.room_name;
		new_room.owner = roomDto.owner;
		new_room.password = roomDto.password;
	return this.roomRepository.save(new_room);
    }


	/*get all user in the given id room*/
	async getRoom(room_Id: number): Promise<Room>
	{
		const room = await this.roomRepository.findOne(room_Id);
		console.log(room.room_name, room.type, 'room here\n', room);
		const p = await this.roomRepository.createQueryBuilder("room")
			 .leftJoinAndSelect("room.participants", "participant")
            .leftJoinAndSelect("participant.user", "user")
			.where("room.id = :room_Id", { room_Id: room_Id })
			.getMany();
		return room;
	}

	async deleteRoom(id: number): Promise<void> {
        await this.roomRepository.delete(id);
    }
}
