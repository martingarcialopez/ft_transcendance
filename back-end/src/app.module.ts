import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity'
import { UserModule } from './modules/user.module';
import { Message } from './models/message.entity';
import { MessageModule } from './modules/message.module';
import { AppGateway } from './app.gateway';

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
  controllers: [],
  providers: [AppGateway],

})
export class AppModule {}
