import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../models/room.entity';
import { RoomService } from '../services/room.service';
import { Participant } from '../models/participant.entity';
@Module({

    imports: [TypeOrmModule.forFeature([Room, Participant])],
	providers: [RoomService],
	exports: [RoomService ],

})
export class RoomModule {}
