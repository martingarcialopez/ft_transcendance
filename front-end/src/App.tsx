import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom"
import SignUp from './screens/SignUpScreen';
import SignIn from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import { Chat } from './components/Chat';
import { Pong } from './components/Pong';
import { NoMatch } from './screens/NoMatchScreen';
import ResponsiveAppBar from './components/NavBar';
import { Profile } from './components/Profile';

function App() {
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
        <Route path='order-summary' element={<Pong />} />

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
