import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import { useAuth } from './auth'

export const Home = () => {
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
