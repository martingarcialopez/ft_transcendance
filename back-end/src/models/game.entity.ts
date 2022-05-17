import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface GameEntity extends InMemoryDBEntity {

//    id: string;

    player: string;

    move: number;

  }