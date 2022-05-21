import "../styles/profileContainerStyles.css";
import RepoCard from "../components/RepoCard";
import { ListFriends } from "../components/ListFriends";

const matchs = [
    {
        player1: 'Champomy',
        player2: 'TaCopineBonne',
        winner: 'TaCopineBonne',
        scoreLoser: 2,
        id: 0,
    },
    {
        player1: 'Champomy',
        player2: 'TaCopineBonne',
        winner: 'TaCopineBonne',
        scoreLoser: 2,
        id: 1,
    },
    {
        player1: 'Champomy',
        player2: 'TaCopineBonne',
        winner: 'TaCopineBonne',
        scoreLoser: 2,
        id: 2,
    },
];

export const ProfilePage = (userInfo: any) => {
    // const ref_default_img = "/game/test/test_42.jpg"
    // const ref_default_img = "/shared/avatar/mgarcia-.png"
    const ref_default_img = "/shared/avatar/avatar_chat.jpeg"

    return (
        <div className="backgroundProfile">
            <div className="profileHeader">
                <h2>Profile</h2>
            </div>
            <div className="profileContainer">
                <aside className="sideBar">
                    <img src={ref_default_img}/*{userInfo.avatar}*/ alt="" className="userImage" />
                    <h1 className="userName">{userInfo.username}</h1>
                    <h3 className="userNickName">{userInfo.login42}</h3>
                    <h5 className="userNickName">{userInfo.firstname}</h5>
                    <h5 className="userNickName">{userInfo.lastname}</h5>
                    <ListFriends />
                </aside>
                <div className="reposContainer">
                    <p className="repoContainerTitle">Historique des matchs</p>
                    <div className="repos">
                        {matchs.map((item) => (
                            <RepoCard
                                key={item.id}
                                player1={item.player1}
                                player2={item.player2}
                                winner={item.winner}
                                scoreLoser={item.scoreLoser}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};