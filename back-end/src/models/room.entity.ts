import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { Participant } from './participant.entity';


@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
    room_name: string;

	@Column()
    owner: string;

	@Column()
    password: string;

	//public or private? false means private
	@Column({ default: false })
	type: boolean;

	@OneToMany((type) => Message, (message) => message.room)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.room)
    participants: Participant[];

}
