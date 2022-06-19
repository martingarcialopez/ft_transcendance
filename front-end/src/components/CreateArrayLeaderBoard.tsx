import { T_LeaderBoard, T_game } from "../type/pongType";
let ArrayGame: T_game[] = [
  {
    rightPlayer: "",
    leftPlayer: "",
    leftPlayerScore: "",
    losser: "",
    winner: "",
    id: 2,
  },
  {
    rightPlayer: "",
    leftPlayer: "",
    leftPlayerScore: "",
    losser: "",
    winner: "",
    id: 3,
  },
];
/*
 * export function createLeader() {
 *   let arrayLeaderboard: T_LeaderBoard[] = [];
 *   ArrayGame.forEach((item: T_game) => {
 *     arrayLeaderboard.push({
 *       name: "",
 *       username: "",
 *       score: item.id,
 *       avatar: "",
 *     });
 *   });
 * }
 *  */

const url = "GET http://localhost:3000/user/all";

export async function CreateLeader() {
  const response = await fetch(url, { method: "Get" });
  console.log(response);
}
