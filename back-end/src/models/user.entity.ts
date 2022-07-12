import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Relationship } from './friends.entity';
import { Message } from './message.entity';
import { Participant } from './participant.entity';

@Entity()
export class User {

  @Exclude()
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

  @Exclude()
  @Column({ nullable: true })
  password: string;

  // @Column({unique:true})
  // email: string;

  @Column( {nullable: true} )
  twofa: boolean;

  @Exclude()
  @Column ( {nullable: true} )
  secret: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: "offline"})
  status: string;

  @Column( {nullable: true} )
  socketId: string;

  @Column("int", { nullable: true, array: true, default: "{}" })
  blockList: number[];

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @OneToMany((type) => Participant, (participant) => participant.user)
	participants: Participant[];

	// @OneToMany((type) => Relationship, (friend) => friend.user)
	// friends: Relationship[];

  // @OneToMany(() => Relationship, (relations) => relations.user)
  // friends: Relationship[];

}
