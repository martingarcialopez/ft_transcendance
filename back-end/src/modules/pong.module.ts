import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/user.service';
import { Matchmaking } from '../models/matchmaking.entity';
import { PongService } from '../services/pong.service'
@Module({

    imports: [TypeOrmModule.forFeature([Matchmaking])],
	providers: [PongService, UserService, InMemoryDBService],
	exports: [PongService ],

})
export class PongModule {}
