import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity'
import { UserModule } from './modules/user.module';
import { MessageGateway } from './message.gateway';
import {MessageService} from './services/message.service';
import { MessageModule } from './modules/message.module';
import { Message } from './models/message.entity';

@Module({

	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'container-postgres',
			port: 5432,
			username: 'root',
			password: 'root',
			database: 'db',
			entities: [User, Message],
			synchronize: true,
		}),

		UserModule, MessageModule
	],
	providers: [MessageGateway],
})
export class AppModule {}
