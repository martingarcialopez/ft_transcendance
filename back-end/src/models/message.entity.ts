import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column("text")
	content: string;

    @OneToOne(() => User)
	@JoinColumn()
    user: User;
}
