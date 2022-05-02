import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/SIgnUp';
import SignIn from './components/SignIn';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import { Pong } from './components/Pong';
import { NoMatch } from './components/NoMatch';
import ResponsiveAppBar from './components/NavBar';
import { Profile } from './components/Profile';

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='order-summary' element={<Pong />} />

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
