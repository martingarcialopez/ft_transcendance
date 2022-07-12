import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PongController } from 'src/controllers/pong.controller';
import { GameHistory } from 'src/models/gamehistory.entity';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user.service';
import { Matchmaking } from '../models/matchmaking.entity';
import { PongService } from '../services/pong.service'
import { UserModule } from './user.module';
@Module({
    imports: [TypeOrmModule.forFeature([Matchmaking, GameHistory, User]), UserModule],
	controllers: [PongController],
	providers: [PongService, InMemoryDBService],
	exports: [PongService ],

})
export class PongModule {}
