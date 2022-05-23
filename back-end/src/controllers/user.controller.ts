import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/in/UpdateUser.dto';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-up')
  createUser( @Body() body: CreateUserDto) : Promise<any> {
      console.log(body);
      return this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getCurrentUser(@Request() req) {
      console.log(req.user.userId);
      return this.userService.getUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  getUser(@Param('username') username: string) : Promise<User> {
      return this.userService.getUser(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:id')
  updateUser( @Body() body: UpdateUserDto, @Param('id', ParseIntPipe) id: string) : Promise<User> {
      return this.userService.updateUser(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteUser( @Param('id', ParseIntPipe) id: string): Promise <void> {
      return this.userService.deleteUser(id);
  }

}