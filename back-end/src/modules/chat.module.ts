import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../models/chat.entity';
import { ChatService } from '../services/chat.service';

@Module({

    imports: [TypeOrmModule.forFeature([Chat])],
    providers: [ChatService],
	exports: [ChatService ],

})
export class ChatModule {}
