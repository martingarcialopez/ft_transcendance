import {
  CHANGE_PAGE_ACTION,
  DISABLE_2FA_CONFIRMED_ACTION,
  ENABLE_2FA_CONFIRMED_ACTION,
  GET_ALL_GAMES_ACTION,
  GET_FRIENDS_LIST_ACTION,
  GET_FRIEND_INFOS_ACTION,
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  UPDATE_CONFIRMED_ACTION,
  UPDATE_FAILED_ACTION,
  UPLOAD_IMAGE_CONFIRMED_ACTION,
} from "../constants/userConstants";

export interface MatchInfo {
  rightPlayer?: string,
  leftPlayer?: string,
  rightPlayerScore?: string,
  leftPlayerScore?: string,
  winner?: string,
  losser?: string,
  id?: number,
}

export interface UserInfo {
  login42?: string,
  username?: string,
  firstname?: string,
  lastname?: string,
  password?: string,
  avatar?: string,
  expiresIn?: any,
  access_token?: string,
  friends: string[],
  twofa: boolean,
  code2FA: string,
  id?: any
}

export interface UserState {
  showLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  userInfo?: UserInfo,
  friendInfo?: UserInfo,
  code2FA?: string;
}

export interface AllMatchState {
  MatchInfo?: MatchInfo[]
}

interface Action {
  type: string;
  payload?: string;
}

export const allMatchReducer = (
  state: AllMatchState = {
  },
  action: Action
) => {
  switch (action.type) {
    case GET_ALL_GAMES_ACTION:
      return {
        ...state,
        MatchInfo: action.payload
      };
    default:
      return state;
  }
};

export const userLoginReducer = (
  state: UserState = {
    showLoading: false,
    errorMessage: "",
    successMessage: "",
    userInfo: {
      login42: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      avatar: '',
      expiresIn: '',
      access_token: '',
      friends: [],
      twofa: false,
      code2FA: '',
      id: 0,
    },
    friendInfo: {
      login42: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      avatar: '',
      expiresIn: '',
      access_token: '',
      friends: [],
      twofa: false,
      code2FA: '',
      id: 0,
    }
  },
  action: Action
) => {
  switch (action.type) {

    case LOADING_TOGGLE_ACTION:
      return {
        ...state,
        showLoading: true,
      };
    case ENABLE_2FA_CONFIRMED_ACTION:
      return {
        ...state,
        showLoading: false,
        errorMessage: "",
        userInfo: { ...state.userInfo, twofa: true, code2FA: action.payload },
      };
    case GET_FRIENDS_LIST_ACTION:
      return {
        ...state,
        showLoading: false,
        errorMessage: "",
        userInfo: { ...state.userInfo, friends: action.payload },
      };
    case GET_FRIEND_INFOS_ACTION:
      return {
        ...state,
        showLoading: false,
        friendInfo: action.payload,
        errorMessage: "",
        successMessage: "Get Friend Infos Successfully Completed",
      };
    case DISABLE_2FA_CONFIRMED_ACTION:
      return {
        ...state,
        showLoading: false,
        errorMessage: "",
        successMessage: "Disable 2FA Successfully Send",
        userInfo: { ...state.userInfo, twofa: false, code2FA: '' },
      };
    case UPLOAD_IMAGE_CONFIRMED_ACTION:
      console.log("UPLOAD_IMAGE_CONFIRMED_ACTION action.payload", action.payload)
      return {
        ...state,
        showLoading: false,
        userInfo: { ...state.userInfo, avatar: action.payload },
        errorMessage: "",
        successMessage: "Image Successfully Upload",
      };
    case UPDATE_CONFIRMED_ACTION:
      return {
        ...state,
        showLoading: false,
        userInfo: action.payload,
        errorMessage: "",
        successMessage: "Profile Successfully Update",
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
    case LOGIN_FAILED_ACTION || SIGNUP_FAILED_ACTION || UPDATE_FAILED_ACTION:
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
        errorMessage: "",
        successMessage: "Logout Successfully Completed",
      };
    case CHANGE_PAGE_ACTION:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
};
