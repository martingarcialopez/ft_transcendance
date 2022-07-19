import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeaderboardProfiles } from "../components/LeaderboardProfiles";
import { RootState } from "../redux";
import {
  getAllGamesAction,
  getAllPlayersAction,
} from "../redux/actions/userActions";
import { AllMatchState } from "../redux/reducers/userReducers";
import "../styles/leaderboardStyles.css";
import { CreateLeader } from "../components/CreateArrayLeaderBoard";

export const LeaderBoard = () => {
  const dispatch = useDispatch();
  const allMatch = useSelector<RootState, AllMatchState>(
    (state: RootState) => state.allMatch
  );

  useEffect(() => {
    dispatch(getAllGamesAction());
    dispatch(getAllPlayersAction());
  }, [dispatch]);

  if (allMatch.MatchInfo) {
    let SortedLeaderBoard = CreateLeader(allMatch);

    return (
      <div className="main">
        <div className="board">
          <h1 className="leaderboard">Leaderboard</h1>

          {/* <LeaderboardProfiles Leaderboard={between(Leaderboard)}></LeaderboardProfiles> */}
          {allMatch && allMatch.MatchInfo ? (
            <LeaderboardProfiles
              Leaderboard={SortedLeaderBoard}
            ></LeaderboardProfiles>
          ) : null}
        </div>
      </div>
    );
  }
  return <></>;
};

/*
 * const Leaderboard = [
 *   {
 *     name: "firstname lastname",
 *     username: "username",
 *     score: 1550,
 *     avatar:
 *       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
 *   },
 *   {
 *     name: "Fidel Hand",
 *     username: "USA",
 *     score: 2310,
 *     avatar:
 *       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
 *   },
 *   {
 *     name: "Bessie Hickle",
 *     username: "Chaina",
 *     score: 350,
 *     avatar:
 *       "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
 *   },
 *   {
 *     name: "Adella Wunsch",
 *     username: "Japan",
 *     score: 2100,
 *     avatar:
 *       "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
 *   },
 *   {
 *     name: "Clair O'Connell",
 *     username: "London",
 *     score: 1250,
 *     avatar:
 *       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
 *   },
 *   {
 *     name: "Kameron Prosacco",
 *     username: "Canada",
 *     score: 5250,
 *     avatar:
 *       "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
 *   },
 * ]; */
