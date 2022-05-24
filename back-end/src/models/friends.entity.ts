import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm"
import { User } from "../models/user.entity";

@Entity()
export class Relationship {
    /* ... other columns */

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => User, (user) => user.friends)
    // member1_id: string;

    // @ManyToOne(() => User, (user) => user.friends)
    @Column()
    member_username: string;

    // @ManyToOne(() => User, (user) => user.friends)
    @Column()
    friend_username: string;
}