import "../styles/profileContainerStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { AllMatchState, UserState } from "../redux/reducers/userReducers";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getAllPlayerGamesAction,
  getUserInfoAction,
} from "../redux/actions/userActions";
import { ListFriends } from "../components/ListFriends";
import RepoCard from "../components/RepoCard";

export const OtherProfileScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //   const userLogin = //Function from Martin to have all user informations
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const allMatch = useSelector<RootState, AllMatchState>(
    (state: RootState) => state.allMatch
  );

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) dispatch(getUserInfoAction(id, userInfo.access_token));
  }, [userInfo, id, dispatch]);

  const { friendInfo }: UserState = userLogin;

  useEffect(() => {
    if (friendInfo) dispatch(getAllPlayerGamesAction(friendInfo.username));
  }, [dispatch, friendInfo]);

  if (!friendInfo) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="backgroundProfile">
      <div className="profileHeader">
        <h2>Profile</h2>
      </div>
      <div className="profileContainer">
        <aside className="sideBar">
          <img
            src={friendInfo.avatar}
            alt="Profile avatar"
            className="userImage"
          />
          <h1 className="userName">{friendInfo.username}</h1>
          <h3 className="userNickName">{friendInfo.login42}</h3>
          <h5 className="userNickName">{friendInfo.firstname}</h5>
          <h5 className="userNickName">{friendInfo.lastname}</h5>
          <ListFriends userPageInfo={friendInfo} />
        </aside>
        <div className="reposContainer">
          <p className="repoContainerTitle">Historique des matchs</p>
          <div className="repos">
            {allMatch.MatchInfo &&
              allMatch.MatchInfo.map((item) => (
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
