import "../styles/profileContainerStyles.css";

import RepoCard from "../components/RepoCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { useParams } from "react-router-dom";
import { ListFriends } from "../components/ListFriends";
import { useEffect } from "react";
import { getInfoAction } from "../redux/actions/userActions";

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

    console.log("id:", id)
    //   const userLogin = //Function from Martin to have all user informations
    const userLogin = useSelector<RootState, UserState>(
        (state: RootState) => state.userLogin
    )

    useEffect(() => {
        console.log("access-token:", userLogin.access_token)
        dispatch(getInfoAction(userLogin.access_token))
    }, [dispatch, userLogin.access_token])

    console.log("Profile UserLogin :");
    console.log(userLogin);

    if (!userLogin || userLogin.errorMessage !== '') {
        return <h1>Loading...</h1>;
    }

    userLogin.userInfo.avatar = "/avatar/avatar_chat.jpeg"

    return (
        <div className="backgroundProfile">
            <div className="profileHeader">
                <h2>Profile</h2>
            </div>
            <div className="profileContainer">
                <aside className="sideBar">
                    <img src={userLogin.userInfo.avatar} alt="" className="userImage" />
                    <h1 className="userName">{userLogin.userInfo.username}</h1>
                    <h3 className="userNickName">{userLogin.userInfo.login42}</h3>
                    <h5 className="userNickName">{userLogin.userInfo.firstname}</h5>
                    <h5 className="userNickName">{userLogin.userInfo.lastname}</h5>
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