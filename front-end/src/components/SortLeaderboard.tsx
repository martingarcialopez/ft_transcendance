import { T_LeaderBoard } from "../type/pongType";
let arrayLeaderboard: T_LeaderBoard[] = [
  {
    name: "mbampe",
    username: "kilian",
    score: 1,
    avatar: "photo",
  },

  {
    name: "messy",
    username: "leo",
    score: 6,
    avatar: "photo",
  },
  {
    name: "neymar",
    username: "santos",
    score: 2,
    avatar: "photo",
  },

  {
    name: "benzema",
    username: "karime",
    score: 56,
    avatar: "photo",
  },
];

export function SortLeaderboard(tab: T_LeaderBoard[] = arrayLeaderboard) {
  let resultat = tab.sort((item1, item2) => item2.score - item1.score);
  console.log("resultat:", resultat);
  return resultat;
}
