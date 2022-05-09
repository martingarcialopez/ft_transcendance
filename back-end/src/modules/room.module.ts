import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../models/room.entity';
import { User } from '../models/user.entity';
import { Message } from '../models/message.entity';
import { Participant } from '../models/participant.entity';
import { RoomService } from '../services/room.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { ParticipantService } from '../services/participant.service';
import { UserModule } from './user.module';
import { MessageModule } from './message.module';
import { ParticipantModule } from './participant.module';

@Module({

    imports: [TypeOrmModule.forFeature([Room, Participant, User, Message]), UserModule, MessageModule, ParticipantModule],
	providers: [RoomService],
	exports: [RoomService],

})
export class RoomModule {}
