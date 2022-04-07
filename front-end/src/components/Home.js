import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'

export const Home = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  return (
    <>
      <div>Home Page</div>
      {!auth.user ?
        <button onClick={() => navigate('login')}>Login</button>
        :
        <button onClick={() => navigate('order-summary')}>Place order</button>
      }
    </>
  )
}
