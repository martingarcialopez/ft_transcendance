import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class GameHistory {

    @PrimaryColumn()
	id: string;

    @Column()
    leftPlayer: string;

    @Column()
    rightPlayer: string;

    @Column()
    leftPlayerScore: number;

    @Column()
    rightPlayerScore: number;

    @Column()
    winner: string;

    @Column()
    losser: string;

}
