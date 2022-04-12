import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity'
import { UserModule } from './modules/user.module';
import { MessageGateway } from './message.gateway';
import {MessageService} from './services/message.service';
import { MessageModule } from './modules/message.module';
import { Message } from './models/message.entity';
import { Room } from './models/room.entity';
import { RoomModule } from './modules/room.module';
import { RoomService} from './services/room.service';
import { Participant } from './models/participant.entity';
import { ParticipantModule } from './modules/participant.module';
import { ParticipantService} from './services/participant.service';
@Module({

	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'container-postgres',
			port: 5432,
			username: 'root',
			password: 'root',
			database: 'db',
			entities: [User, Message, Room, Participant],
			synchronize: true,
		}),

		UserModule, MessageModule, RoomModule, ParticipantModule
	],
	providers: [MessageGateway],
})
export class AppModule {}
