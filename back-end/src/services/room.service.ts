import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from '../dtos/in/room.dto';
import { Room } from '../models/room.entity';

@Injectable()
export class RoomService {

	constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ){}


	async createRoom(roomDto: RoomDto): Promise<Room> {
        const new_room = new Room();
		new_room.chat_name = roomDto.chat_name;
		new_room.owner = roomDto.owner;
		new_room.password = roomDto.password;
	return this.roomRepository.save(new_room);
    }


	 async getRoom(): Promise<Room[]>
    {
        return await this.roomRepository.find();
    }


	async deleteRoom(id: number): Promise<void> {
        await this.roomRepository.delete(id);
    }
}
