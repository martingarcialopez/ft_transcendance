import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/sign-in')
    createUser( @Body() body: CreateUserDto) : Promise<User> {
        console.log(body);
        return this.userService.createUser(body);
    }

    @Get(':id')
    getUser(@Param('id') id: string) : Promise<User> {
        return this.userService.getUser(id);

    }

    @Post('/update/:id')
    updateUser( @Body() body: CreateUserDto, @Param('id') id: string) : Promise<User> {
        return this.userService.updateUser(body, id);
    }

    @Get('/delete/:id')
    deleteUser( @Param('id') id: string): Promise <void> {
        return this.userService.deleteUser(id);
    }

}
