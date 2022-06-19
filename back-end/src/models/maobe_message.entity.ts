import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,CreateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { MaobeRoom } from './maobe_room.entity';

@Entity()
export class MaobeMessage {
	@PrimaryGeneratedColumn()
	id: number;

	// @Column()
	// sender: string;

	@Column('text')
	content: string;

	@CreateDateColumn()
    createdDate: Date;

	@ManyToOne((type) => User, (user) => user.messages)
	@JoinColumn({ name: 'userId' })
	user: User;
	@Column()
	public userId: number;

	@ManyToOne((type) => MaobeRoom, (room) => room.messages)
	@JoinColumn({ name: 'roomId' })
	room: MaobeRoom;
	@Column()
	public roomId: number;
}
