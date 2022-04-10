import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';


@Entity()
export class Participant {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne((type) => User, (user) => user.messages)
    user: User;

	@ManyToOne((type) => Room, (room) => room.messages)
    room: Room;

}
