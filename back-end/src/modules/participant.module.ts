import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '../models/participant.entity';
import { ParticipantService } from '../services/participant.service';
import { RoomModule } from './room.module';

@Module({

    imports: [TypeOrmModule.forFeature([Participant]),
    forwardRef(() => RoomModule),
  ],
	providers: [ParticipantService],
	exports: [ParticipantService ],

})
export class ParticipantModule {}
