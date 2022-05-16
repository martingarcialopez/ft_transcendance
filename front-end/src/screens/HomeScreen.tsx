import { useSelector } from "react-redux";
import ButtonBases from "../components/ButtonBases";
import { UserState } from "../redux/reducers/userReducers";
import { RootState } from "../redux/store";

const HomeScreen = () => {
  // const userLogin = useSelector<RootState, UserState>(
  //   (state: RootState) => state.userLogin
  // )

  // const { userInfo } = userLogin
  // const firstName = userInfo ? userInfo.firstName : null
  const firstName = "user";

  return (
    <div>
      {/* {firstName ? ( */}
      <h1>Welcome {firstName}</h1>
      {/* ) : ( */}
      <div>
        <ButtonBases />
      </div>
      {/* )} */}
    </div>
  );
};

export default HomeScreen;
