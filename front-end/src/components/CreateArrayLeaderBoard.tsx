import { T_LeaderBoard, T_game } from "../type/pongType";

let ArrayGame: T_game[] = [
  {
    rightPlayer: "50cent",
    leftPlayer: "kiki",
    leftPlayerScore: "2",
    rightPlayerScore: "3",
    losser: "kiki",
    winner: "50cent",
    id: 0,
  },
  {
    rightPlayer: "50cent",
    leftPlayer: "max",
    leftPlayerScore: "2",
    rightPlayerScore: "4",
    losser: "max",
    winner: "50cent",
    id: 1,
  },
  {
    rightPlayer: "50cent",
    leftPlayer: "max",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "max",
    winner: "50cent",
    id: 2,
  },
  {
    rightPlayer: "50cent",
    leftPlayer: "kiki",
    leftPlayerScore: "5",
    rightPlayerScore: "3",
    losser: "50cent",
    winner: "kiki",
    id: 3,
  },
  {
    rightPlayer: "50cent",
    leftPlayer: "max",
    leftPlayerScore: "5",
    rightPlayerScore: "3",
    losser: "50cent",
    winner: "max",
    id: 4,
  },

  {
    rightPlayer: "max",
    leftPlayer: "kiki",
    leftPlayerScore: "1",
    rightPlayerScore: "3",
    losser: "kiki",
    winner: "max",
    id: 5,
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
 * step one : 
     -get all user name from data base
     -step  create a empty array typeof T_LeaderBoard "arrayLeaderboard"
 * step two : fill that array created in step one
 * step three : set the score into array arrayLeaderboard
 * step four : sort arrayLeaderboard
 */
export async function CreateLeader(allGame: T_game[] = ArrayGame) {
  //step one
  let arrayLeaderboard: T_LeaderBoard[] = [];
  let tmpLeaderBoard: T_LeaderBoard;
  const url = "http://localhost:3000/user/all";
  let response = await fetch(url);
  let usersList = await response.json();

  //step two
  for (let i in usersList) {
    tmpLeaderBoard = AddNEw(usersList[i]);
    arrayLeaderboard.push(tmpLeaderBoard);
  }

  //step three
  CountScore(allGame, arrayLeaderboard);
  console.log(arrayLeaderboard);
  //step four
  SortLeaderboard(arrayLeaderboard);

  return arrayLeaderboard;
}
