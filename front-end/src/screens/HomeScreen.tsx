import { useSelector } from 'react-redux'
import ButtonBases from '../components/ButtonBases'
import { UserState } from '../redux/reducers/userReducers'
import { RootState } from '../redux/store'

const HomeScreen = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )

  const { userInfo } = userLogin
  const firstname = userInfo ? userInfo.firstname : null

  return (
    <div>
      {firstname ?
        <div>
          <h1>Welcome {firstname}</h1>
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
