import './App.css';
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom"
import SignUp from './screens/SignUpScreen';
import SignIn from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
// import { ChatTemplate } from './screens/ChatTemplate';
import { Pong } from './screens/Pong';
import { NoMatch } from './screens/NoMatchScreen';
import ResponsiveAppBar from './components/NavBar';
import { Profile } from './screens/Profile';
import { Room } from './screens/Room';
import { Chat } from './screens/Chat';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(props);
  //   // checkAutoLogin(dispatch, props.history);
  // }, []);

  // let routes = (
  //   <Switch>
  //     <Route path='/signup' element={<SignUp />} />
  //     <Route path='/login' element={<SignIn />} />
  //     <Route path='/' element={<HomeScreen />} />
  //   </Switch>
  // );

  // if (props.isAuthenticated) {
  //   routes = (
  //     <Switch>
  //       <Route path='/posts' element={<ChatTemplate />} />
  //       <Route path='/createpost' element={<Profile />} />
  //       <Route exact path='/' element={<HomeScreen />} />
  //       <Redirect to='/' />
  //     </Switch>
  //   );
  // }

  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/home' element={<HomeScreen />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/order-summary' element={<Pong />} />
        {/* <Route path='/room' element={<Room />} /> */}

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
