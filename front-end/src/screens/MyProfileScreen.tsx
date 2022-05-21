import "../styles/profileContainerStyles.css";

import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { ProfilePage } from "../components/ProfilePage";

export const ProfileContainer = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  console.log("Profile UserLogin :");
  console.log(userLogin);


  if (!userLogin || userLogin.errorMessage !== '') {
    return <h1>Loading...</h1>;
  }
  const { userInfo }: UserState = userLogin;

  return (
    <ProfilePage userInfo={userInfo} />
  );
};