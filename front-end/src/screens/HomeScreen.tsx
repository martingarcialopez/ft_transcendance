import { useSelector } from 'react-redux'
import ButtonBases from '../components/ButtonBases'
import { UserState } from '../redux/reducers/userReducers'
import { RootState } from '../redux/store'

const HomeScreen = () => {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  )

  const { userInfo } = userLogin
  const firstName = userInfo ? userInfo.firstName : null

  return (
    <div>
      {firstName ?
        <div>
          <h1>Welcome {firstName}</h1>
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
