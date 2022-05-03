import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';


@Entity()
export class Message{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
    sender: string;

	@Column("text")
	content: string;

	@Column()
    room_name: string;


	@ManyToOne((type) => User, (user) => user.messages)
	@JoinColumn({ name: 'userId' })
    user: User;

    @Column({nullable:true}) // THIS SHOULD BE DELETE
    //@Column()
    public userId: number;

	@ManyToOne((type) => Room, (room) => room.messages)
	@JoinColumn({ name: 'roomId' })
	room: Room;

	@Column()
	public roomId: number;

}
