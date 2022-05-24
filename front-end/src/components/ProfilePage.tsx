import "../styles/profileContainerStyles.css";
import RepoCard from "../components/RepoCard";
import { ListFriends } from "../components/ListFriends";
import { UpdateProfile } from "./UpdateProfile";

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

export const ProfilePage = ({ userInfo }: any) => {
    // const ref_default_img = "/game/test/test_42.jpg"
    // const ref_default_img = "/shared/avatar/mgarcia-.png"

    return (
        <div className="backgroundProfile">
            <div className="profileHeader">
                <h2>Profile</h2>
            </div>
            <div className="profileContainer">
                <aside className="sideBar">
                    <UpdateProfile userInfo={userInfo} />
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