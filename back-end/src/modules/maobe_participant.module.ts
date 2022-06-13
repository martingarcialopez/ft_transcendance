import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaobeParticipant } from '../models/maobe_participant.entity';
import { MaobeParticipantService } from '../services/maobe_participant.service';

@Module({

    imports: [TypeOrmModule.forFeature([MaobeParticipant])],
	providers: [MaobeParticipantService],
	exports: [MaobeParticipantService],

})
export class MaobeParticipantModule {}
