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


@Injectable()
export class RoomService {

	constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ){}


	async createRoom(roomDto: RoomDto): Promise<RoomSnippetDto>
	{
        const new_room = new Room();
		new_room.name = roomDto.name;
		new_room.typeChannel = roomDto.typeChannel;
		new_room.password = roomDto.password;
		new_room.owner = roomDto.owner;
		//		new_room.members = roomDto.members;
		await this.roomRepository.save(new_room);
		const dto = plainToClass(RoomSnippetDto, new_room);
		console.log(typeof 'HERE', typeof dto, dto);
		return dto;
    }


	/*get all user in the given id room*/
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

	async deleteRoom(id: number): Promise<void> {
        await this.roomRepository.delete(id);
    }
}


/*https://stackoverflow.com/questions/53378667/cast-entity-to-dto*/
