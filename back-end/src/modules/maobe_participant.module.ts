import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaobeParticipant } from '../models/maobe_participant.entity';
import { MaobeParticipantService } from '../services/maobe_participant.service';
import { MaobeRoomModule } from './maobe_room.module';

@Module({

	imports: [TypeOrmModule.forFeature([MaobeParticipant]),
			  forwardRef(() => MaobeRoomModule),
			 ],
	providers: [MaobeParticipantService],
	exports: [MaobeParticipantService],

})
export class MaobeParticipantModule {}
