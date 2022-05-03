import { HttpCode, HttpException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'https';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { User } from '../models/user.entity';
import { unlinkSync } from 'fs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(payload: CreateUserDto): Promise<User> {

        const user = new User();
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.username = payload.username;

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(payload.password, saltOrRounds);
        user.password = hash;

        user.login42 = null;
        user.isActive = false;

        return this.userRepository.save(user);
    }

    create42User(user: User): Promise<User> {

        return this.userRepository.save(user);
    }

    getUser(user: string): Promise<User> {
        return this.userRepository.findOne({ username: user });
    }

    getUserById(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    getUserBy42Login(user: string): Promise<User> {
        return this.userRepository.findOne({ login42: user });
    }

    async updateUser(body: CreateUserDto, id: string): Promise<User> {

        let user = new User();
        if (!(user = await this.userRepository.findOne(id)))
            throw new NotFoundException();

        for (const property in body) {
            user[property] = body[property];
        }
        return this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<void> {

        const user : User = await this.getUserById(id);

        if (!user)
            return null; // user does not exist

        const path = `/usr/src/app/avatar/${user.login42}.png`;

        try {
            unlinkSync(path)
            //file removed
        } catch (err) {
            console.error(err)
        }

        await this.userRepository.delete(id);
    }
}
