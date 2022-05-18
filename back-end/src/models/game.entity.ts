import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface GameEntity extends InMemoryDBEntity {

    player: string;

    move: number;

  }