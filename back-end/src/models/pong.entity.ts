import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Pong {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;
}
