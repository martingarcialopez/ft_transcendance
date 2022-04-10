import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { Participant } from './participant.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column({ default: false })
	isActive: boolean;

/* note: we will create user property in the Message entity */
	@OneToMany((type) => Message, (message) => message.user)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.user)
    participant: Participant[];
}
