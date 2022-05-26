import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../models/message.entity';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.entity';
import { Relationship } from 'src/models/friends.entity';
import { GameHistory } from 'src/models/gamehistory.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Message, User, Relationship, GameHistory]), ],
	providers: [MessageService, UserService],
  exports: [MessageService],
})
export class MessageModule {}
