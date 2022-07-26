import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserModule } from './modules/user.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

import { Message } from './models/message.entity';
import { MessageModule } from './modules/message.module';
import {MessageService} from './services/message.service';
import { MessageGateway } from './gateway/message.gateway';

import { Room } from './models/room.entity';
import { RoomModule } from './modules/room.module';
import { RoomService} from './services/room.service';
import { RoomGateway } from './gateway/room.gateway';

import { Participant } from './models/participant.entity';
import { ParticipantModule } from './modules/participant.module';
import { ParticipantService} from './services/participant.service';
import { ParticipantGateway} from './gateway/participant.gateway';


import { PongGateway } from './gateway/pong.gateway';
import { PongService} from './services/pong.service';
import { Matchmaking} from './models/matchmaking.entity';
import { PongModule} from './modules/pong.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

import { ConfigModule } from '@nestjs/config';
import { Relationship } from './models/friends.entity';
import { GameHistory } from './models/gamehistory.entity';

//MAOBE VERSION
import { MaobeChatGateway }  from './gateway/maobe_chat.gateway';

import { MaobeMessage } from './models/maobe_message.entity';
import { MaobeMessageModule } from './modules/maobe_message.module';
import { MaobeMessageService } from './services/maobe_message.service';

import { MaobeRoom } from './models/maobe_room.entity';
import { MaobeRoomModule } from './modules/maobe_room.module';
import { MaobeRoomService} from './services/maobe_room.service';

import { MaobeParticipant } from './models/maobe_participant.entity';
import { MaobeParticipantModule } from './modules/maobe_participant.module';
import { MaobeParticipantService} from './services/maobe_participant.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'container-postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'db',
		entities: [User, Message, MaobeMessage, Room, MaobeRoom, Participant, MaobeParticipant, Matchmaking, Relationship, GameHistory],
      synchronize: true,
    }),
    // MulterModule.register({
    //   dest: './upload',
    // }),
    InMemoryDBModule.forRoot({}),
    HttpModule,
    UserModule,
    MessageModule, MaobeMessageModule,
      AuthModule,
	  RoomModule, ParticipantModule,
	  MaobeRoomModule, MaobeParticipantModule,
	  PongModule,
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new HandlebarsAdapter(), // or new PugAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
   // }),
  ],
  controllers: [],
	providers: [MessageGateway, RoomGateway, ParticipantGateway, PongGateway, MaobeChatGateway],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//       consumer
//         .apply(OauthMiddleware)
//         .forRoutes(OauthController)
//   }
// }

