import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
} from "../constants/userConstants";

export interface UserState {
  showLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  userInfo: {
    login42?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    avatar?: string;
    expiresIn?: any;
    id: number;
  }; //ADD other elements
}

interface Action {
  type: string;
  payload?: string;
}

export const userLoginReducer = (
  state: UserState = {
    showLoading: false,
    errorMessage: "",
    successMessage: "",
    userInfo: {
      login42: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      avatar: "",
      expiresIn: "",
      id: 0,
    },
  },
  action: Action
) => {
  switch (action.type) {
    case LOADING_TOGGLE_ACTION:
      return {
        ...state,
        showLoading: true,
      };
    case LOGIN_CONFIRMED_ACTION:
      return {
        ...state,
        showLoading: false,
        userInfo: action.payload,
        errorMessage: "",
        successMessage: "Login Successfully Completed",
      };
    case SIGNUP_CONFIRMED_ACTION:
      return {
        ...state,
        showLoading: false,
        userInfo: action.payload,
        errorMessage: "",
        successMessage: "Signup Successfully Completed",
      };
    case LOGIN_FAILED_ACTION || SIGNUP_FAILED_ACTION:
      return {
        ...state,
        showLoading: false,
        errorMessage: action.payload,
        successMessage: "",
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        userInfo: action.payload,
        successMessage: "Logout Successfully Completed",
      };
    default:
      return state;
  }
};
