import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION
} from '../constants/userConstants'

export interface UserState {
  showLoading?: boolean
  errorMessage?: string,
  successMessage?: string,
  userInfo: { firstName?: string; lastName?: string } //ADD other elements
}

interface Action {
  type: string
  payload?: string
}

export const userLoginReducer = (
  state: UserState = { userInfo: {} },
  action: Action
) => {
  switch (action.type) {
    case LOADING_TOGGLE_ACTION:
      return {
        showLoading: true
      }
    case LOGIN_CONFIRMED_ACTION:
      return {
        showLoading: false,
        userInfo: action.payload,
        errorMessage: '',
        successMessage: 'Login Successfully Completed',
      }
    case SIGNUP_CONFIRMED_ACTION:
      return {
        showLoading: false,
        userInfo: action.payload,
        errorMessage: '',
        successMessage: 'Signup Successfully Completed',
      }
    case LOGIN_FAILED_ACTION:
      return {
        showLoading: false,
        errorMessage: action.payload,
        successMessage: '',
      }
    case SIGNUP_FAILED_ACTION:
      return {
        showLoading: false,
        errorMessage: action.payload,
        successMessage: '',
      }
    case LOGOUT_ACTION:
      return {

      }
    default:
      return state
  }
}
