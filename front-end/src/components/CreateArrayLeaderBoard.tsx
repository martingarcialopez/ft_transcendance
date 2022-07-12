import { T_LeaderBoard } from "../type/pongType";
import { AllMatchState, MatchInfo } from "../redux/reducers/userReducers";
import { Player } from "../redux/reducers/userReducers";

let ArrayGame: MatchInfo[] = [
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
 * return false if @username doesn't exist into arrayLeaderboard
 * return alse if @username  exist into arrayLeaderboard
 */

function IsDuplicate(arrayLeaderboard: string[], username: string) {
  let existed: boolean = false;
  if (arrayLeaderboard.length === 0) return false;
  arrayLeaderboard.forEach((item: string) => {
    if (item === username) existed = true;
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
  allGame: MatchInfo[] = ArrayGame,
  arrayLeaderboard: T_LeaderBoard[]
) {
  allGame.forEach((item: MatchInfo) => {
    for (let i = 0; i < arrayLeaderboard.length; i++) {
      if (arrayLeaderboard[i].name === item.winner)
        arrayLeaderboard[i].score += 1;
    }
  });
  return arrayLeaderboard;
}

function SortLeaderboard(arrayLeaderboard: T_LeaderBoard[]) {
  let resultat = arrayLeaderboard.sort(
    (item1, item2) => item2.score - item1.score
  );
  return resultat;
}

/*
 * async function getUsers() {
 *   const url = "http://localhost:3000/user/all";
 *   fetch(url).then((response) => {
 *     if (!response.ok) {
 *       throw new Error("Network response was not OK");
 *     }
 *     return response.json();
 *   });
 * }
 *  */
function createUserList(allGame: MatchInfo[] | undefined) {
  if (typeof allGame === "undefined" || !allGame) return ["empty"];
  let userList: string[] = [];
  for (let i = 0; i < allGame.length; i++) {
    if (IsDuplicate(userList, allGame[i].leftPlayer) === false) {
      userList.push(allGame[i].leftPlayer);
    }
    if (IsDuplicate(userList, allGame[i].rightPlayer) === false) {
      userList.push(allGame[i].rightPlayer);
    }
  }
  return userList;
}

/**
 * create a array of leaderboard and sort it
 * step one : 
   -get all user name of game to put them into array 
   -step  create a empty array typeof T_LeaderBoard "arrayLeaderboard"
 * step two : fill that array created in step one
 * step three : set the score into array arrayLeaderboard
 * step four : sort arrayLeaderboard
 */
/* export async function CreateLeader(allGame: T_game[] = ArrayGame | MatchInfo) { */

export function CreateLeader(allLeaderboardInfo: AllMatchState | undefined) {
  if (!allLeaderboardInfo)
    return [];

  // console.log("CreateLeader allLeaderboardInfo", allLeaderboardInfo)

  let arrayLeaderboard: T_LeaderBoard[] = [];
  let tmpLeaderBoard: T_LeaderBoard;
  //step one
  let usersList = createUserList(allLeaderboardInfo.MatchInfo);

  //step two
  for (let i in usersList) {
    tmpLeaderBoard = AddNEw(usersList[i]);
    arrayLeaderboard.push(tmpLeaderBoard);
  }
  //step three
  arrayLeaderboard = CountScore(allLeaderboardInfo.MatchInfo, arrayLeaderboard);
  arrayLeaderboard = SortLeaderboard(arrayLeaderboard);

  if (allLeaderboardInfo && allLeaderboardInfo.Players) {
    allLeaderboardInfo.Players.forEach((item: Player, it: number) => {
      // console.log("CreateLeader item:", item)
      if (item && arrayLeaderboard[it]) {
        if (item.avatar)
          arrayLeaderboard[it].avatar = item.avatar;
        else
          arrayLeaderboard[it].avatar = '/shared/avatar/avatar_chat.jpeg';
      }
      /* console.log("pendant :", arrayLeaderboard[it].avatar); */
    });
  }
  // const url = "http://localhost:3000/user/all";
  // fetch(url)
  //   .then((response) => response.json())
  //   .then(function copy(data) {
  //     console.log("CreateLeader data", data)
  //     data.forEach((item: Player, it: number) => {
  //       console.log("CreateLeader item:", item)
  //       if (item) {
  //         if (item.avatar)
  //           arrayLeaderboard[it].avatar = item.avatar;
  //         else
  //           arrayLeaderboard[it].avatar = '/shared/avatar/avatar_chat.jpeg';
  //       }
  //       /* console.log("pendant :", arrayLeaderboard[it].avatar); */
  //     });
  //   });
  return arrayLeaderboard;
}
