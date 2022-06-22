import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";
import { RootState } from "../redux/store";

export function GetUserInfo() {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const { userInfo }: UserState = userLogin;
  /* if (userLogin.showLoading) {
   *   return <h1>Loading...</h1>;
   * } */
  return userInfo;
}
