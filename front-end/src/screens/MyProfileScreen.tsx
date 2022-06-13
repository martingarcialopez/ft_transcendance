import "../styles/profileContainerStyles.css";

import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserState } from "../redux/reducers/userReducers";
import { ProfilePage } from "../components/ProfilePage";

export const MyProfileScreen = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )
  console.log("Profile UserLogin :");
  console.log(userLogin);


  if (!userLogin) {
    return <h1>Loading...</h1>;
  }
  const { userInfo }: UserState = userLogin;

  console.log("userInfo MyProfile:", userInfo)

  return (
    <ProfilePage userInfo={userInfo} id={userInfo?.id} />
  );
};