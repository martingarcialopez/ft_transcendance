import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "../models/user.entity";

@Entity()
export class Relationship {
    /* ... other columns */

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => User, (user) => user.friends)
    // user: string;

    @Column()
    member_username: string;

    @Column()
    friend_username: string;


	// @ManyToOne((type) => User, (user) => user.friends)
	// @JoinColumn({ name: 'userId' })
    // user: User;
	// @Column()
    // public userId: number;
}
