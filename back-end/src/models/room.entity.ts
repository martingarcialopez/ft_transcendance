import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { Participant } from './participant.entity';


@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
    name: string;

	@Column()
	type: boolean;

	@OneToMany((type) => Message, (message) => message.room)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.room)
    participant: Participant[];

}
