import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { MaobeMessage } from './maobe_message.entity';
import { MaobeParticipant } from './maobe_participant.entity';

@Entity()
export class MaobeRoom {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	typeRoom: string;

	@Column({ default: false })
	is_protected: boolean;

	@Column({ nullable: true, default: null })
    password: string;

	@Column()
	image: string;

	@Column()
	owner : number;

	@Column("int",  { nullable:true, array: true, default: "{}" })
	admin: number[];

	@Column("int",  { nullable:true, array: true, default: "{}" })
	banList: number[];

	@OneToMany((type) => MaobeMessage, (message) => message.room)
    messages: MaobeMessage[];

	@OneToMany((type) => MaobeParticipant, (participant) => participant.room)
    participants: MaobeParticipant[];

}
