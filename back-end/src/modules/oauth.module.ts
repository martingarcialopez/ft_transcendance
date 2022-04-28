import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthController } from 'src/controllers/oauth.controller';
import { MessageController } from '../controllers/message.controller';

@Module({

    imports: [ HttpModule],
//    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [OauthController],
    providers: [ ]

})
export class OauthModule {}