import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from '../controllers/message.controller';
import { Message } from '../models/message.entity';
import { MessageService } from '../services/message.service';

@Module({

    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [MessageService],
	exports: [MessageService ],

})
export class MessageModule {}
