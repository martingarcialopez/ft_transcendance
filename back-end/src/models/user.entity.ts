import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;
}