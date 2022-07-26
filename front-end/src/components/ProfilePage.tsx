import "../styles/profileContainerStyles.css";
import RepoCard from "../components/RepoCard";
import { ListFriends } from "../components/ListFriends";
import { UpdateProfile } from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { AllMatchState } from "../redux/reducers/userReducers";
import { useEffect } from "react";
import { getAllPlayerGamesAction } from "../redux/actions/userActions";

// const matchs = [
//     {
//         rightPlayer: 'Champomy',
//         leftPlayer: 'TaCopineBonne',
//         rightPlayerScore: '3',
//         leftPlayerScore: '2',
//         winner: 'Champomy',
//         losser: 'TaCopineBonne',
//         id: 0,
//     },
//     {
//         rightPlayer: 'Champomy',
//         leftPlayer: 'TaCopineBonne',
//         rightPlayerScore: '3',
//         leftPlayerScore: '2',
//         winner: 'Champomy',
//         losser: 'TaCopineBonne',
//         id: 1,
//     },
//     {
//         rightPlayer: 'Champomy',
//         leftPlayer: 'TaCopineBonne',
//         rightPlayerScore: '3',
//         leftPlayerScore: '2',
//         winner: 'Champomy',
//         losser: 'TaCopineBonne',
//         id: 2,
//     },
// ];

export const ProfilePage = ({ userInfo }: any) => {
    // const ref_default_img = "/game/test/test_42.jpg"
    // const ref_default_img = "/shared/avatar/mgarcia-.png"
    const dispatch = useDispatch()
    const allMatch = useSelector<RootState, AllMatchState>(
        (state: RootState) => state.allMatch
    )

    useEffect(() => {
        dispatch(getAllPlayerGamesAction(userInfo.username))
    }, [dispatch, userInfo])

    return (
        <div className="backgroundProfile">
            <div className="profileHeader">
                <h2>Profile</h2>
            </div>
            <div className="profileContainer">
                <aside className="sideBar">
                    <UpdateProfile userInfo={userInfo} />
                    <ListFriends userPageInfo={userInfo} />
                </aside>
                <div className="reposContainer">
                    <p className="repoContainerTitle">Historique des matchs</p>
                    <div className="repos">
                        {allMatch.MatchInfo && allMatch.MatchInfo.map((item) => (
                            <RepoCard
                                id={item.id}
                                key={item.id}
                                leftPlayer={item.leftPlayer}
                                rightPlayer={item.rightPlayer}
                                leftPlayerScore={item.leftPlayerScore}
                                rightPlayerScore={item.rightPlayerScore}
                                winner={item.winner}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};