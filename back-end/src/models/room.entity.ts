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

	//public or private or protected
	@Column()
	typeRoom: string;

	@Column({nullable:true})
    password?: string;

	@Column({nullable:true})
    avatar: string;


	@Column("int",  { nullable:true, array: true, default: "{}" })
	//owner: number[] = [];
	owner: number[];

	@OneToMany((type) => Message, (message) => message.room)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.room)
    participants: Participant[];

}
