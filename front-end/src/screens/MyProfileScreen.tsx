import "../styles/profileContainerStyles.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { AllMatchState, UserState } from "../redux/reducers/userReducers";
import { ControlledSwitches } from "../components/ControlledSwitches";
import { UpdateProfile } from "../components/UpdateProfile";
import { ListFriends } from "../components/ListFriends";
import RepoCard from "../components/RepoCard";
import { useEffect } from "react";
import { getAllPlayerGamesAction } from "../redux/actions/userActions";

export const MyProfileScreen = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  const dispatch = useDispatch()
  const allMatch = useSelector<RootState, AllMatchState>(
    (state: RootState) => state.allMatch
  )
  const { userInfo }: UserState = userLogin;

  useEffect(() => {
    if (userInfo)
      dispatch(getAllPlayerGamesAction(userInfo.username))
  }, [dispatch, userInfo])


  if (!userLogin) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <ControlledSwitches userInfo={userInfo} />
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
    </div>
  );
};