import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Matchmaking {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	difficulty: string;

	@Column()
	winningScore: number;

	@Column()
	roomName: string;

	@Column( {nullable:true, default: null} )
	lock: string;


}