import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { MaobeRoom } from './maobe_room.entity';


@Entity()
export class MaobeParticipant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("timestamptz", {nullable:true, default: '2019-06-29'})
	mute_until: Date;

	@ManyToOne((type) => User, (user) => user.participants, {
      onDelete: 'CASCADE',
      orphanedRowAction: "delete" // NEW
    })
	@JoinColumn({ name: 'userId' })
    user: User;

	@Column()
    public userId: number;

	@ManyToOne((type) => MaobeRoom, (room) => room.participants)
	@JoinColumn({ name: 'roomId' })
    room: MaobeRoom;

	@Column()
    public roomId: number;
}
