import { LeaderboardProfiles } from '../components/LeaderboardProfiles';
import "../styles/leaderboardStyles.css";

export const LeaderBoard = () => {
    function between(data: any){
        // sort with asending order
        return data.sort((a: any, b: any) => {
            if ( a.score === b.score){
                return b.score - a.score;
            } else{
                return b.score - a.score;
            }
        })
    
    }

  return (
    <div className="main">
        <div className="board">
        <h1 className='leaderboard'>Leaderboard</h1>

        <LeaderboardProfiles Leaderboard={between(Leaderboard)}></LeaderboardProfiles>
        </div>

    </div>
  )
}

const Leaderboard = [
    {
        name: "Shawn Hanna",
        location: "India",
        score : 1550,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2022-02-10"
    },
    {
        name: "Fidel Hand",
        location: "USA",
        score : 2310,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2021-01-01"
    },
    {
        name: "Bessie Hickle",
        location: "Chaina",
        score : 350,
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2021-08-17"
    },
    {
        name: "Adella Wunsch",
        location: "Japan",
        score : 2100,
        img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2021-10-23"
    },
    {
        name: "Clair O'Connell",
        location: "London",
        score : 1250,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2022-01-22"
    },
    {
        name: "Kameron Prosacco",
        location: "Canada",
        score : 5250,
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        dt: "2022-01-21"
    }
]
