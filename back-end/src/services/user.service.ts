import { HttpStatus, HttpException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/in/CreateUser.dto';
import { ParticipantDto } from '../dtos/in/participant.dto';
import { BlockUserDto } from '../dtos/in/blockUser.dto';
import { User } from '../models/user.entity';
import { unlinkSync } from 'fs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(payload: CreateUserDto): Promise<any> {

        const existing_user = await this.userRepository.findOne({ username: payload.username });

        if (existing_user)
            throw new HttpException('username already in use', HttpStatus.CONFLICT);

        const user = new User();
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.username = payload.username;
        user.avatar = payload.avatar;

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(payload.password, saltOrRounds);
        user.password = hash;

        user.login42 = null;
        user.isActive = false;

        const db_user: User = await this.userRepository.save(user);
        const { password, ...result } = db_user;
        return result;
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

    async updateUser(body: Partial<User>, id: string): Promise<User> {

        let user = new User();
        if (!(user = await this.userRepository.findOne(id)))
            throw new NotFoundException();

        if (body.password) {
            const saltOrRounds = 10;
            body.password = await bcrypt.hash(body.password, saltOrRounds);
        }
        if (!body.id)
            Object.assign(user, body);
        else
            throw new BadRequestException('Cannot overwrite user id');
        return this.userRepository.save(user);
    }

    async deleteUser(id: string) {

        const user: User = await this.getUserById(id);

        if (!user)
            throw new HttpException('user not found', HttpStatus.NOT_FOUND); // user does not exist

        if (user.avatar) {
            const path = `/usr/src/app/avatar/${user.login42}.png`;
            try {
                unlinkSync(path); //file removed
            } catch (err) {
                console.error(err);
            }
        }
        await this.userRepository.delete(id);
    }

	async getBlockList(userId: number): Promise<number[]> | null {

		console.log('id isss ', userId);
		let user : User = await this.userRepository.createQueryBuilder("user")
            .select(["user.blockList"])
            .where("user.id = :user_Id", { user_Id: userId})
			.getOne();
		if (user == null)
			return null;
		return user['blockList'];
	}

	async blockUser(body: BlockUserDto) : Promise<void>
	{
		if (body.userId == body.blockUserId)
			return ;
		let blockList : number[] | null = await this.getBlockList(body.userId);
		console.log('blockList: ', blockList );
		if (blockList == null)// the user is invalid
			return ;
		blockList.push(body.blockUserId);
		await this.userRepository
            .createQueryBuilder()
            .update("User")
            .set({ blockList: blockList })
            .where("id = :id", { id: body.userId })
            .execute();
	}


}
