import {
  CHANGE_PAGE_ACTION,
  GET_ALL_GAMES_ACTION,
  GET_FRIENDS_LIST_ACTION,
  GET_FRIEND_INFOS_ACTION,
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  UPDATE_FAILED_ACTION,
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
  id?: any
}

export interface UserState {
  showLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  userInfo?: UserInfo,
  friendInfo?: UserInfo,
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
    MatchInfo: [{
      rightPlayer: 'rightPlayer',
      leftPlayer: 'leftPlayer',
      leftPlayerScore: 'rightPlayer',
      losser: 'rightPlayer',
      winner: 'leftPlayer',
      id: 0,
    },
    {
      rightPlayer: 'player3',
      leftPlayer: 'player4',
      leftPlayerScore: 'player3',
      losser: 'rightPlayer',
      winner: 'leftPlayer',
      id: 1,
    },
    {
      rightPlayer: 'player3',
      leftPlayer: 'player4',
      leftPlayerScore: 'player3',
      losser: 'rightPlayer',
      winner: 'leftPlayer',
      id: 2,
    },
    {
      rightPlayer: 'player3',
      leftPlayer: 'player4',
      leftPlayerScore: 'player3',
      losser: 'rightPlayer',
      winner: 'leftPlayer',
      id: 3,
    },
    ]
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
    case GET_FRIENDS_LIST_ACTION:
      return {
        ...state,
        showLoading: false,
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
