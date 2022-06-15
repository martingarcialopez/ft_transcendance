import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/in/UpdateUser.dto';
import { User } from '../models/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
 import { Express } from 'express';
// import Express from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from  'path';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('uploadProfileImage')
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
            destination: './public/shared/avatar',
            filename: (req, file, cb) => {
                // const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${req.user['username']}${extname(file.originalname)}`)
              }
          }),
      }))
  uploadProfileImage(@UploadedFile() file: Express.Multer.File) {

    const response = {
    	originalname: file.originalname,
    	filename: file.filename,
    };
    return response;
  }

@Get('/all')
getAllUsers() {
    return this.userService.getAllUsers();
}

  @Post('/sign-up')
  createUser( @Body() body: CreateUserDto) : Promise<any> {
      console.log(body);
      return this.userService.createUser(body);
  }

//   @Post('/update/avatar')
//   updateUserAvatar(@)

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getCurrentUser(@Request() req) {
      console.log(req.user.userId);
      return this.userService.getUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/friends')
  getUserFriends(@Request() req) {
      return this.userService.getUserFriends(req.user.userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/friends/:username')
  addFriend (@Request() req, @Param('username') username: string) {
      return this.userService.addFriend(req.user.userId, username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/friends/:username')
  deleteFriend (@Request() req, @Param('username') username: string) {
      return this.userService.deleteFriend(req.user.userId, username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  getUser(@Param('username') username: string) : Promise<User> {
      console.log('in get user');
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

  @Get('/games/all')
  getAllGames() {
      return this.userService.getAllGames();
  }

//   @UseGuards(JwtAuthGuard)
  @Get('/games/:username')
  getUserGames(@Param('username') username: string) {
      return this.userService.getUserGames(username);
  }
  
}