import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pong } from '../models/pong.entity';
import { PongService } from '../services/pong.service'
@Module({

    imports: [TypeOrmModule.forFeature([Pong])],
	providers: [PongService, InMemoryDBService],
	exports: [PongService ],

})
export class PongModule {}
