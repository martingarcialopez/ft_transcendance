import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameHistory } from 'src/models/gamehistory.entity';
import { UserService } from 'src/services/user.service';
import { Matchmaking } from '../models/matchmaking.entity';
import { PongService } from '../services/pong.service'
import { UserModule } from './user.module';
@Module({

    imports: [TypeOrmModule.forFeature([Matchmaking, GameHistory]), UserModule],
	providers: [PongService, InMemoryDBService],
	exports: [PongService ],

})
export class PongModule {}
