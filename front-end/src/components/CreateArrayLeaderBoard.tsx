import { T_LeaderBoard } from "../type/pongType";
import { AllMatchState, MatchInfo } from "../redux/reducers/userReducers";
import { Player } from "../redux/reducers/userReducers";

function AddNEw(
  name: string | undefined,
  avatar: string | undefined
): T_LeaderBoard {
  return {
    name: typeof name !== "undefined" ? name : "",
    username: "",
    score: 0,
    avatar: typeof avatar !== "undefined" ? avatar : "",
  };
}

/**
 * read through ArrayGame at each game add one to the winner into arrayleaderboard
 * the first loop it read the game one by one
 * the inner loop it go to find the winner of the game to add his score by one
 */
function CountScore(
  allGame: MatchInfo[] | undefined,
  arrayLeaderboard: T_LeaderBoard[]
) {
  if (typeof allGame !== "undefined") {
    allGame.forEach((item: MatchInfo) => {
      for (let i = 0; i < arrayLeaderboard.length; i++) {
        if (arrayLeaderboard[i].name === item.winner)
          arrayLeaderboard[i].score += 1;
      }
    });
  }
  return arrayLeaderboard;
}

function SortLeaderboard(arrayLeaderboard: T_LeaderBoard[]) {
  let resultat = arrayLeaderboard.sort(
    (item1, item2) => item2.score - item1.score
  );
  return resultat;
}

/**
 * create a array of leaderboard and sort it
 * step one : 
	 - create leaderboard array through @allLeaderboardInfo.Players item
 * step two :
	 -  set the score of each match into array arrayLeaderboard
 * step four : 
	 -sort arrayLeaderboard
 */

/* export async function CreateLeader(allGame: T_game[] = ArrayGame | MatchInfo) { */

export function CreateLeader(allLeaderboardInfo: AllMatchState | undefined) {
  if (!allLeaderboardInfo) return [];

  let arrayLeaderboard: T_LeaderBoard[] = [];
  let tmpLeaderBoard: T_LeaderBoard;

  if (typeof allLeaderboardInfo.Players !== "undefined") {
    allLeaderboardInfo.Players.forEach((item: Player) => {
      tmpLeaderBoard = AddNEw(item.username, item.avatar);
      arrayLeaderboard.push(tmpLeaderBoard);
    });
  }
  //set avatar
  /* if (allLeaderboardInfo && allLeaderboardInfo.Players) {
   *   allLeaderboardInfo.Players.forEach((item: Player, it: number) => {
   *     if (item && arrayLeaderboard[it]) {
   *       if (item.avatar) arrayLeaderboard[it].avatar = item.avatar;
   *       else arrayLeaderboard[it].avatar = "/shared/avatar/avatar_chat.jpeg";
   *     }
   *   });
   * } */
  //step three
  arrayLeaderboard = CountScore(allLeaderboardInfo.MatchInfo, arrayLeaderboard);
  arrayLeaderboard = SortLeaderboard(arrayLeaderboard);
  return arrayLeaderboard;
}
