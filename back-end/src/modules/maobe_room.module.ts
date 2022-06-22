import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { MaobeRoom } from '../models/maobe_room.entity';
import { MaobeMessage } from '../models/maobe_message.entity';
import { MaobeParticipant } from '../models/maobe_participant.entity';

import { UserService } from '../services/user.service';
import { MaobeRoomService } from '../services/maobe_room.service';
import { MaobeMessageService } from '../services/maobe_message.service';
import { MaobeParticipantService } from '../services/maobe_participant.service';

import { UserModule } from './user.module';
import { MaobeMessageModule } from './maobe_message.module';
import { MaobeParticipantModule } from './maobe_participant.module';

@Module({

    imports: [TypeOrmModule.forFeature([MaobeRoom, MaobeParticipant, User, MaobeMessage]), UserModule, MaobeMessageModule, MaobeParticipantModule],
	providers: [MaobeRoomService],
	exports: [MaobeRoomService],

})
export class MaobeRoomModule {}
