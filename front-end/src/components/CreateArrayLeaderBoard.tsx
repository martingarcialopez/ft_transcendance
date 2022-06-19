import { T_LeaderBoard, T_game } from "../type/pongType";

let ArrayGame: T_game[] = [
  {
    rightPlayer: "a",
    leftPlayer: "b",
    leftPlayerScore: "3",
    rightPlayerScore: "1",
    losser: "a",
    winner: "b",
    id: 0,
  },
  {
    rightPlayer: "a",
    leftPlayer: "b",
    leftPlayerScore: "3",
    rightPlayerScore: "1",
    losser: "a",
    winner: "b",
    id: 1,
  },
  {
    rightPlayer: "a",
    leftPlayer: "b",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "b",
    winner: "a",
    id: 2,
  },
  {
    rightPlayer: "c",
    leftPlayer: "a",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "a",
    winner: "c",
    id: 3,
  },
  {
    rightPlayer: "a",
    leftPlayer: "b",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "b",
    winner: "a",
    id: 4,
  },

  {
    rightPlayer: "a",
    leftPlayer: "b",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "b",
    winner: "a",
    id: 5,
  },
  {
    rightPlayer: "c",
    leftPlayer: "a",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "a",
    winner: "c",
    id: 6,
  },
];

/**
 * verify if username is already into arrayLeaderboard
 */
function CheckDuplicate(arrayLeaderboard: T_LeaderBoard[], username: string) {
  let existed: boolean = false;
  if (arrayLeaderboard.length === 0) return false;
  arrayLeaderboard.forEach((item: T_LeaderBoard) => {
    if (item.name == username) existed = true;
  });
  return existed;
}

function AddNEw(name: string): T_LeaderBoard {
  return {
    name: name,
    username: "",
    score: 0,
    avatar: "",
  };
}

/**
 * read through ArrayGame at each game add one to the winner into arrayleaderboard
 * the first loop it read the game one by one
 * the inner loop it go to find the winner of the game to add his score by one
 */
function CountScore(
  allGame: T_game[] = ArrayGame,
  arrayLeaderboard: T_LeaderBoard[]
) {
  allGame.forEach((item: T_game) => {
    for (let i = 0; i < arrayLeaderboard.length; i++) {
      if (arrayLeaderboard[i].name === item.winner)
        arrayLeaderboard[i].score += 1;
    }
  });
}

/**
 *
 */
function SortLeaderboard(arrayLeaderboard: T_LeaderBoard[]) {
  let resultat = arrayLeaderboard.sort(
    (item1, item2) => item2.score - item1.score
  );
  return resultat;
}

/**
 * create a array of leaderboard and sort it
 * step one : create a empty array typeof T_LeaderBoard "arrayLeaderboard"
 * step two : fill that array created in step one
 * step three : set the score into array arrayLeaderboard
 * step four : sort arrayLeaderboard
 */
export async function CreateLeader(allGame: T_game[] = ArrayGame) {
  //step one
  let arrayLeaderboard: T_LeaderBoard[] = [];
  let tmpLeaderBoard: T_LeaderBoard;
  //step two
  allGame.forEach((item: T_game) => {
    if (CheckDuplicate(arrayLeaderboard, item.leftPlayer) === false) {
      tmpLeaderBoard = AddNEw(item.leftPlayer);
      arrayLeaderboard.push(tmpLeaderBoard);
    }
    if (CheckDuplicate(arrayLeaderboard, item.rightPlayer) === false) {
      tmpLeaderBoard = AddNEw(item.rightPlayer);
      arrayLeaderboard.push(tmpLeaderBoard);
    }
  });

  //step three
  CountScore(allGame, arrayLeaderboard);
  console.log(arrayLeaderboard);
  //step four
  SortLeaderboard(arrayLeaderboard);
  return arrayLeaderboard;
}
