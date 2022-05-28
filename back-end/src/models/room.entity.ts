import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Message } from './message.entity';
import { Participant } from './participant.entity';

@Entity()
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string;

	//public or private or protected
	@Column()
	typeRoom: string;

	@Column({ default: false })
	is_protected: boolean;

	@Column({nullable:true})
    password?: string;

	@Column()
	owner : number;

	@Column("int",  { nullable:true, array: true, default: "{}" })
	//owner: number[] = [];
	admin: number[];

	@Column("int",  { nullable:true, array: true, default: "{}" })
	banList: number[];

	@OneToMany((type) => Message, (message) => message.room)
    messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.room)
    participants: Participant[];

}
