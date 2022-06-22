import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface GameEntity extends InMemoryDBEntity {

    room: string;

    player: string;

    move: number;

  }