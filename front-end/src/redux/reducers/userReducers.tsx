import {
  CHANGE_PAGE_ACTION,
  DISABLE_2FA_CONFIRMED_ACTION,
  ENABLE_2FA_CONFIRMED_ACTION,
  GET_ALL_GAMES_ACTION,
  GET_ALL_PLAYERS_ACTION,
  GET_FRIENDS_LIST_ACTION,
  GET_FRIENDS_LIST_FOR_FRIEND_ACTION,
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

/*
	TON INTERFACE:
 * export interface MatchInfo {
 *   rightPlayer?: string;
 *   leftPlayer?: string;
 *   rightPlayerScore?: string;
 *   leftPlayerScore?: string;
 *   winner?: string;
 *   losser?: string;
 *   id?: number;
 * }
 *
 *  */

export interface MatchInfo {
  rightPlayer: string;
  leftPlayer: string;
  rightPlayerScore: string;
  leftPlayerScore: string;
  winner?: string;
  losser?: string;
  id?: number;
}

export interface Player {
  username?: string;
  avatar?: string;
}

export interface Friend {
  username?: string;
  avatar?: string;
  status?: string;
}

export interface UserInfo {
  login42?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  avatar?: string;
  expiresIn?: any;
  access_token?: string;
  friends: Friend[];
  twofa?: boolean;
  code2FA?: string;
  status?: string;
  id?: any;
}

export interface UserState {
  showLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  userInfo?: UserInfo;
  friendInfo?: UserInfo;
  code2FA?: string;
}

export interface AllMatchState {
  MatchInfo?: MatchInfo[];
  Players?: Player[];
}

interface Action {
  type: string;
  payload?: string;
}

export const allMatchReducer = (state: AllMatchState = {}, action: Action) => {
  switch (action.type) {
    case GET_ALL_GAMES_ACTION:
      return {
        ...state,
        MatchInfo: action.payload,
      };
    case GET_ALL_PLAYERS_ACTION:
      return {
        ...state,
        Players: action.payload,
      };
    default:
      return state;
  }
};

export const userLoginReducer = (
  state: UserState = {
    showLoading: false,
    errorMessage: undefined,
    successMessage: "",
    userInfo: {
      login42: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      avatar: "",
      expiresIn: "",
      access_token: "",
      friends: [],
      twofa: false,
      code2FA: "",
      id: 0,
    },
    friendInfo: {
      login42: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      avatar: "",
      expiresIn: "",
      access_token: "",
      friends: [],
      twofa: false,
      code2FA: "",
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
    case ENABLE_2FA_CONFIRMED_ACTION:
      return {
        ...state,
        showLoading: false,
        errorMessage: undefined,
        userInfo: { ...state.userInfo, twofa: true, code2FA: action.payload },
      };
    case GET_FRIENDS_LIST_FOR_FRIEND_ACTION:
      console.log(
        "GET_FRIENDS_LIST_FOR_FRIEND_ACTION action.payload",
        action.payload
      );
      return {
        ...state,
        showLoading: false,
        errorMessage: undefined,
        friendInfo: { ...state.friendInfo, friends: action.payload },
      };
    case GET_FRIENDS_LIST_ACTION:
      console.log("GET_FRIENDS_LIST_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        errorMessage: undefined,
        userInfo: { ...state.userInfo, friends: action.payload },
      };
    case GET_FRIEND_INFOS_ACTION:
      console.log("GET_FRIEND_INFOS_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        friendInfo: action.payload,
        errorMessage: undefined,
        successMessage: "Get Friend Infos Successfully Completed",
      };
    case DISABLE_2FA_CONFIRMED_ACTION:
      // console.log("DISABLE_2FA_CONFIRMED_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        errorMessage: undefined,
        successMessage: "Disable 2FA Successfully Send",
        userInfo: { ...state.userInfo, twofa: false, code2FA: "" },
      };
    case UPLOAD_IMAGE_CONFIRMED_ACTION:
      console.log("UPLOAD_IMAGE_CONFIRMED_ACTION action.payload");
      return {
        ...state,
        showLoading: false,
        errorMessage: undefined,
        successMessage: "Image Successfully Upload",
      };
    case UPDATE_CONFIRMED_ACTION:
      console.log("UPDATE_CONFIRMED_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        userInfo: action.payload,
        errorMessage: undefined,
        successMessage: "Profile Successfully Update",
      };
    case LOGIN_CONFIRMED_ACTION:
      console.log("LOGIN_CONFIRMED_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        userInfo: action.payload,
        errorMessage: undefined,
        successMessage: "Login Successfully Completed",
      };
    case SIGNUP_CONFIRMED_ACTION:
      console.log("SIGNUP_CONFIRMED_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        userInfo: action.payload,
        errorMessage: undefined,
        successMessage: "Signup Successfully Completed",
      };
    case LOGIN_FAILED_ACTION:
    case SIGNUP_FAILED_ACTION:
    case UPDATE_FAILED_ACTION:
      console.log("SIGNUP_FAILED_ACTION action.payload", action.payload);
      return {
        ...state,
        showLoading: false,
        errorMessage: action.payload,
        successMessage: undefined,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        userInfo: action.payload,
        errorMessage: undefined,
        successMessage: "Logout Successfully Completed",
      };
    case CHANGE_PAGE_ACTION:
      return {
        ...state,
        errorMessage: undefined,
      };
    default:
      return state;
  }
};
