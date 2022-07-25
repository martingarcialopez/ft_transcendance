import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "./screens/SignUpScreen";
import SignIn from "./screens/SigninScreen";
import HomeScreen from "./screens/HomeScreen";
import { Chat } from "./screens/Chat";
import { Pong } from "./screens/PongScreen";
import ResponsiveAppBar from "./components/NavBar";
import { MyProfileScreen } from "./screens/MyProfileScreen";
/* import { Room } from "./screens/Room"; */
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { RootState } from "./redux";
import { UserState } from "./redux/reducers/userReducers";
import { OtherProfileScreen } from "./screens/OtherProfileScreen";
import { LeaderBoard } from "./screens/LeaderBoard";
import { MaobeChat } from "./screens/MaobeChat";
import { Twofa } from "./screens/Twofa";
import { RedirectPage } from "./screens/RedirectPage";
import { JoinPongRoom } from "./components/JoinPongRoom";
import SuccessAuth from "./screens/SuccessAuth";

const App = () => {
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
      <Route path="/auth/redirect" element={<RedirectPage />} />
      <Route path="/auth/success/:id" element={<SuccessAuth />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/joingame/:id" element={<JoinPongRoom />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile/:id" element={<OtherProfileScreen />} />
        <Route path="/profile" element={<MyProfileScreen />} />
        <Route path="/pong" element={<Pong />} />
        {/* <Route path="/room" element={<Room />} /> */}
        <Route path="/maobe_chat" element={<MaobeChat />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/logout" element={<HomeScreen />} />
        <Route path="/twofa" element={<Twofa />} />
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
