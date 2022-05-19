import "../styles/profileContainerStyles.css";

import RepoCard from "../components/RepoCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
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

export const ProfileContainer = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  console.log("Profile UserLogin :");
  console.log(userLogin);


  if (!userLogin || userLogin.errorMessage !== '') {
    return <h1>Loading...</h1>;
  }

  userLogin.userInfo.avatar = "./avatar/test_42.jpg"

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