import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matchmaking } from '../models/matchmaking.entity';
import { PongService } from '../services/pong.service'
@Module({

    imports: [TypeOrmModule.forFeature([Matchmaking])],
	providers: [PongService, InMemoryDBService],
	exports: [PongService ],

})
export class PongModule {}
