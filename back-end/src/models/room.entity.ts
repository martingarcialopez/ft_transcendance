import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Message } from './message.entity';
import { Participant } from './participant.entity';

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	room_name: string;

	//public or private? false means private
	@Column()
	type: string;

	@Column()
    password: string;

	@Column()
    owner: string;


	@OneToMany((type) => Message, (message) => message.room)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.room)
    participants: Participant[];

}
