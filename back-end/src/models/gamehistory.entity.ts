import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class GameHistory {

    @PrimaryGeneratedColumn()
	id: string;

    @Column()
    roomId: string;

    @Column()
    difficulty: string;

    @Column()
    maxScore: number;

    @Column()
    leftPlayer: string;

    @Column( { nullable: true } )
    rightPlayer: string;

    @Column( { nullable: true } )
    leftPlayerScore: number;

    @Column( { nullable: true } )
    rightPlayerScore: number;

    @Column( { nullable: true } )
    winner: string;

    @Column( { nullable: true } )
    losser: string;


}
