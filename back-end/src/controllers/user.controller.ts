import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { userInfo } from 'os';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/sign-in')
    createUser( @Body() body: CreateUserDto) : Promise<User> {
        console.log(body);
        return this.userService.createUser(body);
    }

    @Get('/:id')
    getUser(@Param('id') id: string) : Promise<User> {
        return this.userService.getUser(id);

    }

    @Post('/update/:id')
    updateUser( @Body() body: CreateUserDto, @Param('id') id: string) : Promise<User> {
        return this.userService.updateUser(body, id);
    }

    @Delete('/:id')
    deleteUser( @Param('id') id: string): Promise <void> {
        return this.userService.deleteUser(id);
    }

}
