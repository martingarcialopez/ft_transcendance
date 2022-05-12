import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom"
import SignUp from './screens/SignUpScreen';
import SignIn from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import { Chat } from './screens/Chat';
// import { ChatTemplate } from './screens/ChatTemplate';
import { Pong } from './screens/Pong';
// import { NoMatch } from './screens/NoMatchScreen';
import ResponsiveAppBar from './components/NavBar';
import { Profile } from './screens/Profile';
import { Room } from './screens/Room';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { checkAutoLogin } from './redux/services/userServices';
import { RootState } from './redux';
import { UserState } from './redux/reducers/userReducers';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAutoLogin(dispatch);
  }, []);

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )

  const { userInfo } = userLogin
  const isAuthenticated = userInfo ? userInfo : null

  let routes = (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} />
      <Route path='/home' element={<HomeScreen />} />
      <Route path='/' element={<HomeScreen />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="order-summary" element={<Pong />} />
        <Route path="/room" element={<Room />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/' element={<HomeScreen />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    );
  }

  return (
    <Router>
      <ResponsiveAppBar />
      <Suspense fallback={<div>Loading...</div>}>
        {routes}
      </Suspense>
    </Router>
  );
};

export default App;
