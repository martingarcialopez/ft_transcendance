import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../models/room.entity';
import { RoomService } from '../services/room.service'
@Module({

    imports: [TypeOrmModule.forFeature([Room])],
	providers: [RoomService],
	exports: [RoomService ],

})
export class RoomModule {}
