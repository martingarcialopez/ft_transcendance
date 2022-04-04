import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    createUser(payload: CreateUserDto): Promise<User> {

        const user = new User();
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.username = payload.username;
        user.password = payload.password;

        return this.userRepository.save(user);
    }

    getUser(id: string): Promise<User> {
        return this.userRepository.findOne(id);
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
        await this.userRepository.delete(id);
    }

}
