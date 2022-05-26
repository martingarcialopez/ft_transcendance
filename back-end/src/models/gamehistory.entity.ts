import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';


@Entity()
export class GameHistory {

    @PrimaryColumn()
	id: string;

    @Column()
    leftPlayer: string;

    @Column()
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
