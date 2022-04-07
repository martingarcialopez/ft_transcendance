import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import { NoMatch } from './components/NoMatch'
import { Users } from './components/Users'
import { UserDetails } from './components/UserDetails'
import { Admin } from './components/Admin'
import { AuthProvider } from './components/auth'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { RequireAuth } from './components/RequireAuth'
import { Chat } from './components/Chat'
import { Pong } from './components/Pong'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
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
