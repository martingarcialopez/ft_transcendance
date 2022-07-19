import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaobeMessage } from '../models/maobe_message.entity';
import { MaobeMessageService } from '../services/maobe_message.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.entity';
import { Relationship } from 'src/models/friends.entity';
import { GameHistory } from 'src/models/gamehistory.entity';
import { Matchmaking } from 'src/models/matchmaking.entity';

@Module({
	imports: [TypeOrmModule.forFeature([MaobeMessage, User, Relationship, GameHistory, Matchmaking]), ],
	providers: [MaobeMessageService, UserService],
	exports: [MaobeMessageService],
})
export class MaobeMessageModule {}
