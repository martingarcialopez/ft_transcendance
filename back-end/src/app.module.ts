import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity'
import { UserModule } from './modules/user.module';
import { Message } from './models/message.entity';
import { MessageModule } from './modules/message.module';
import { AppGateway } from './app.gateway';
import {MessageService} from './services/message.service';
import {MessageController} from './controllers/message.controller';
import { ChatModule } from './modules/chat.module';
import { Chat } from './models/chat.entity'

@Module({

	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'container-postgres',
			port: 5432,
			username: 'root',
			password: 'root',
			database: 'db',
			entities: [User, Message, Chat],
			synchronize: true,
		}),
		UserModule, MessageModule, ChatModule
	],
	providers: [AppGateway],
})
export class AppModule {}
