import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable : true})
  avatar: string;

  @Column({ default: false })
  isActive: boolean;
}