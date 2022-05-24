import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relationship } from '../models/friends.entity';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Relationship])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
