import "../styles/profileContainerStyles.css";
import RepoCard from "../components/RepoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { useNavigate, useParams } from "react-router-dom";
import { ListFriends } from "../components/ListFriends";
import { useEffect } from "react";
import { getUserInfoAction } from "../redux/actions/userActions";

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

export const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("id:", id)
    //   const userLogin = //Function from Martin to have all user informations
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )
    console.log("userLogin Profile:", userLogin )

    useEffect(() => {
        dispatch(getUserInfoAction(id, userLogin.userInfo.access_token, navigate))
    }, [dispatch, id, userLogin.userInfo.access_token, navigate])

    if (!userLogin || !userLogin.friendInfo) {
        return <h1>Loading...</h1>;
    }

    const { friendInfo } = userLogin;
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
                    <img src={ref_default_img}/*{friendInfo.avatar}*/ alt="" className="userImage" />
                    <h1 className="userName">{friendInfo.username}</h1>
                    <h3 className="userNickName">{friendInfo.login42}</h3>
                    <h5 className="userNickName">{friendInfo.firstname}</h5>
                    <h5 className="userNickName">{friendInfo.lastname}</h5>
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