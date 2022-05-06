import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Message } from './message.entity';
import { Participant } from './participant.entity';

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	//public or private? false means private
	@Column()
	typeChannel: string;

	@Column({nullable:true})
    password?: string;

	//should modify string -> int
	@Column("varchar",  { nullable:true, array: true, default: "{}" })
    owner: string[];

	@OneToMany((type) => Message, (message) => message.room)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.room)
    participants: Participant[];
}
