import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../models/message.entity';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Message, User]), ],
	providers: [MessageService, UserService],
  exports: [MessageService],
})
export class MessageModule {}
