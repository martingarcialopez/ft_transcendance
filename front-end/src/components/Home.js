import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'

export const Home = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <>
      <div>Home Page</div>
      <div className="App-body">
      {!auth.user ?
          <LoginButton />
        :
          <LogoutButton />
      }
      </div>
    </>
  )
}
