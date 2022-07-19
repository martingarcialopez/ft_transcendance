import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonBases from '../components/ButtonBases'
import { checkAutoLogin } from '../redux/actions/userActions'
import { UserState } from '../redux/reducers/userReducers'
import { RootState } from '../redux/store'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )

  const { userInfo } = userLogin
  const username = userInfo ? userInfo.username : null

  useEffect(() => {
    if (userInfo?.access_token) {
      checkAutoLogin(dispatch, userInfo?.access_token, navigate);
    }
  }, [dispatch, navigate, userInfo?.access_token, username]);

  return (
    <div>
      {username ?
        <div>
          <h1>Welcome {username}</h1>
        </div>
        :
        <div>
          <ButtonBases />
        </div>
      }
    </div>
  )
}


export default HomeScreen
