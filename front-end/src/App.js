import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
//import { Navbar } from './components/Navbar'
import { ResponsiveAppBar } from './components/NavBar2'
import { NoMatch } from './components/NoMatch'
import { Users } from './components/Users'
import { UserDetails } from './components/UserDetails'
import { Admin } from './components/Admin'
import { AuthProvider } from './components/auth'
//import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { RequireAuth } from './components/RequireAuth'
import { Chat } from './components/Chat'
import { Pong } from './components/Pong'
import { Challenges } from './components/Challenges'
import SignIn from './components/SignIn2'
import SignUp from './components/SignUp'

function App() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/chat' element={<Chat />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path='order-summary' element={<Pong />} />
        <Route path='users' element={<Users />}>
          <Route path=':userId' element={<UserDetails />} />
          <Route path='admin' element={<Admin />} />
        </Route>

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
