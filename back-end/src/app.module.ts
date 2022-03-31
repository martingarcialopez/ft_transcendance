import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'
import { UserModule } from './user/user.module';

@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'container-postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'db',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
