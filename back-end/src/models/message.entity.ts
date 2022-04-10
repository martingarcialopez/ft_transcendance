import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
    name: string;


	@Column("text")
	content: string;

	@ManyToOne((type) => User, (user) => user.messages)
    user: User;

}
