import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "./screens/SignUpScreen";
import SignIn from "./screens/SigninScreen";
import HomeScreen from "./screens/HomeScreen";
import { Chat } from "./screens/Chat";
// import { ChatTemplate } from './screens/ChatTemplate';
import { Pong } from "./screens/Pong2";
// import { NoMatch } from './screens/NoMatchScreen';
import ResponsiveAppBar from "./components/NavBar";
import { ProfileContainer } from "./screens/ProfileContainer";
import { Room } from "./screens/Room";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { checkAutoLogin } from "./redux/services/userServices";
import { RootState } from "./redux";
import { UserState } from "./redux/reducers/userReducers";
import { bindActionCreators } from "redux";
import { socket } from "./components/Event";
import * as actionCreatorsRoom from "./redux/action-creators/Ac_room";
import { T_Room } from "./type/chat";

const App = () => {
  const dispatch = useDispatch();
  const { ac_InitRoomArray } = bindActionCreators(actionCreatorsRoom, dispatch);
  useEffect(() => {
    checkAutoLogin(dispatch);
  }, [dispatch]);

  /****************************************/

  socket.emit("allRoomInfos");

  socket.on("allRoomInfosRes", (receive: T_Room[]) => {
    receive.forEach((item: T_Room) => {
      item.avatar =
        "https://avatars.dicebear.com/api/adventurer/" + item.name + ".svg";
    });
    console.log("test : ", receive);
    ac_InitRoomArray(receive);
  });

  /****************************************/

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo } = userLogin;
  const isAuthenticated = userInfo ? userInfo : null;

  let routes = (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileContainer />} />
        <Route path="pong" element={<Pong />} />
        <Route path="/room" element={<Room />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/logout" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Router>
      <ResponsiveAppBar />
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </Router>
  );
};

export default App;
