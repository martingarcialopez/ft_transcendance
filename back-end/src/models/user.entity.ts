import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';
import { Participant } from './participant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  login42: string;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false })
	isActive: boolean;

 @OneToMany((type) => Message, (message) => message.user)
   messages: Message[];

	@OneToMany((type) => Participant, (participant) => participant.user)
    participants: Participant[];
}
