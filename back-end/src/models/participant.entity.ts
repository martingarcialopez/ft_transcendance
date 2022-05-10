import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';


@Entity()
export class Participant {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne((type) => User, (user) => user.participants)
	@JoinColumn({ name: 'userId' })
    user: User;

	@Column()
    public userId: number;

	@ManyToOne((type) => Room, (room) => room.participants)
	@JoinColumn({ name: 'roomId' })
    room: Room;

	@Column()
    public roomId: number;
}
