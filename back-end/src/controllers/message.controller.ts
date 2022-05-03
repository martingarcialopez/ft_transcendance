import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateMessageDto } from '../dtos/in/message.dto';
import { Message } from '../models/message.entity';
import { MessageService } from '../services/message.service';

@Controller('message')
export class MessageController {

    constructor(private readonly messageService: MessageService) {}


    @Post('send')
    createMessage( @Body() body: CreateMessageDto) : Promise<Message> {
        return this.messageService.createMessage(body);
    }

	//show all the message sent by a specific name
    @Get(':user_id')
    getMessage(@Param('user_id') user_id: string) : Promise<Message> {
        return this.messageService.findOne(user_id);

    }

    @Get()
    Show_all_the_messages() : Promise<Message[]> {
        return this.messageService.getMessage();
    }

    @Delete(':id')
    deleteMessage( @Param('id') id: string): Promise <void> {
        return this.messageService.deleteMessage(id);
    }
	}
