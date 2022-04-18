import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity'
import { UserModule } from './modules/user.module';
import { Message } from './models/message.entity';
import { MessageModule } from './modules/message.module';
import { OauthModule } from './modules/oauth.module';
import { OauthMiddleware } from './middleware/Oauth.middleware';
import { OauthController } from './controllers/oauth.controller';
import { HttpModule } from '@nestjs/axios';

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
    HttpModule,
    UserModule,
    MessageModule,
    OauthModule,
  ],
  controllers: [],
  providers: [],

})
// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(OauthMiddleware)
        .forRoutes(OauthController)
  }
}