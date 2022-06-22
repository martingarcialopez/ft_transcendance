import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../models/participant.entity';
import { ParticipantService } from '../services/participant.service'
import { MaobeParticipantService } from '../services/maobe_participant.service'

@Module({

    imports: [TypeOrmModule.forFeature([Participant])],
	providers: [ParticipantService],
	exports: [ParticipantService],

})
export class ParticipantModule {}
