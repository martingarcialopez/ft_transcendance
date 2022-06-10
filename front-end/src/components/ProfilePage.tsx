import "../styles/profileContainerStyles.css";
import RepoCard from "../components/RepoCard";
import { ListFriends } from "../components/ListFriends";
import { UpdateProfile } from "./UpdateProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";

const matchs = [
    {
        rightPlayer: 'Champomy',
        leftPlayer: 'TaCopineBonne',
        rightPlayerScore: '3',
        leftPlayerScore: '2',
        winner: 'Champomy',
        losser: 'TaCopineBonne',
        id: 0,
    },
    {
        rightPlayer: 'Champomy',
        leftPlayer: 'TaCopineBonne',
        rightPlayerScore: '3',
        leftPlayerScore: '2',
        winner: 'Champomy',
        losser: 'TaCopineBonne',
        id: 1,
    },
    {
        rightPlayer: 'Champomy',
        leftPlayer: 'TaCopineBonne',
        rightPlayerScore: '3',
        leftPlayerScore: '2',
        winner: 'Champomy',
        losser: 'TaCopineBonne',
        id: 2,
    },
];

export const ProfilePage = ({ userInfo }: any) => {
    // const ref_default_img = "/game/test/test_42.jpg"
    // const ref_default_img = "/shared/avatar/mgarcia-.png"
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )

    console.log("ProfilePage userLogin", userLogin)

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
                        {userLogin.MatchInfo && userLogin.MatchInfo.map((item) => (
                            <RepoCard
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