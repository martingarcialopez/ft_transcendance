import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserModule } from './modules/user.module';
import { OauthMiddleware } from './middleware/Oauth.middleware';
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
import { ParticipantGateway } from './gateway/participant.gateway';


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
    HttpModule,
    UserModule,
    MessageModule,
      AuthModule,
	  RoomModule, ParticipantModule
  ],
  controllers: [],
  providers: [MessageGateway, RoomGateway, ParticipantGateway],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//       consumer
//         .apply(OauthMiddleware)
//         .forRoutes(OauthController)
//   }
// }
