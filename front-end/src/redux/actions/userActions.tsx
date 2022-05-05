import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
} from '../constants/userConstants'
import { RootState } from '../../store'

export const login =
  (
    username: String,
    password: String
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        }),
      })

      const data = await response.json()
      console.log(data);

      const responseData = await fetch('http://localhost:3000/user/current', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password
        }),
      })

      const userData = { access_token: data.access_token }

      console.log(userData);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      })

      localStorage.setItem('userInfo', JSON.stringify(userData))
    } catch (error: any) {
      console.log("ON A FOIRE");
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const logout =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })

    await fetch('http://localhost:3000/auth/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  }
