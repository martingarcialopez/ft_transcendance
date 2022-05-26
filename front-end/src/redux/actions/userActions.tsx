import { NavigateFunction } from 'react-router-dom';
import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  LOGOUT_ACTION,
  LOGIN_FAILED_ACTION,
  SIGNUP_FAILED_ACTION,
  CHANGE_PAGE_ACTION,
  GET_FRIEND_INFOS_ACTION,
  UPDATE_FAILED_ACTION,
  GET_FRIENDS_LIST_ACTION,
} from '../constants/userConstants'
import { addFriend, removeFriend, formatError, getFriendList, getInfo, getUserInfo, login, runLogoutTimer, saveTokenInLocalStorage, signUp, update } from '../services/userServices';

export function signupAction(firstname: any, lastname: any, username: any, password: any, navigate: any) {
  return (dispatch: any) => {
    signUp(firstname, lastname, username, password)
      .then((response) => {
        console.log("signupAction response : ")
        console.log(response)
        dispatch(loginAction(username, password, navigate))
      })
      .catch((error) => {
        console.log("ceci est une error dans signupAction :")
        console.log(error);
        const errorMessage = formatError(error.code);
        console.log("ceci est une errorMessage return de formatError dans signupAction :" + errorMessage)
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function updateAction(firstname: any, lastname: any, username: any, password: any, avatar: any, id: any, access_token: any, friends: any) {
  return (dispatch: any) => {
    update(firstname, lastname, username, password, avatar, id, access_token, friends)
      .then((response) => {
        console.log("updateAction response : ")
        console.log(response)
        saveTokenInLocalStorage(access_token, response.data);
        dispatch(loginConfirmedAction(response.data))
      })
      .catch((error) => {
        console.log("ceci est une error dans signupAction :")
        console.log(error);
        const errorMessage = formatError(error.code);
        //Check l erreur pour expliquer que les infos sont pas update.
        console.log("ceci est une errorMessage return de formatError dans signupAction :" + errorMessage)
        dispatch(updateFailedAction(errorMessage));
      });
  };
}

export function getInfoAction(access_token: any) {
  return (dispatch: any) => {
    getInfo(access_token)
      .then((response) => {
        console.log("getInfoAction access_token:", access_token)
        console.log("getInfoAction response:", response)
        saveTokenInLocalStorage(access_token, response.data);
        // tokenDetails.expiresIn
        runLogoutTimer(
          dispatch,
          5000000000 * 1000,
        );
        console.log("signupAction response : ")
        console.log(response)
        console.log("signupAction response data : ")
        console.log(response.data)
        dispatch(loginConfirmedAction(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getUserInfoAction(username: any, access_token: any) {
  return (dispatch: any) => {
    getUserInfo(username, access_token)
      .then((response) => {
        dispatch(getFriendInfosAction(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getFriendListAction(userInfo: any) {
  return (dispatch: any) => {
    getFriendList(userInfo.access_token)
      .then((response) => {
        console.log("getFriendListAction response", response)
        dispatch(updateAction(userInfo.firstname, userInfo.lastname, userInfo.username, userInfo.password, userInfo.avatar, userInfo.id, userInfo.access_token, response.data));
        // dispatch(getFriendListConfirmedAction(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function addFriendAction(username: any, userInfo: any) {
  return (dispatch: any) => {
    console.log("addFriendAction username", username)
    console.log("addFriendAction userInfo", userInfo)
    addFriend(username, userInfo.access_token)
      .then(() => {
        dispatch(getFriendListAction(userInfo));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function removeFriendAction(username: any, access_token: any) {
  return (dispatch: any) => {
    removeFriend(username, access_token)
      .then(() => {
        dispatch(getFriendListAction(access_token));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}
export function logout() {
  localStorage.removeItem('userInfo');
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(username: any, password: any, navigate: NavigateFunction) {
  return (dispatch: any) => {
    login(username, password)
      .then((response) => {
        console.log("loginAction qui fct :")
        console.log(response)
        console.log("loginAction data qui fct :")
        console.log(response.data)
        console.log("loginAction data access qui fct :")
        console.log(response.data.access_token)
        dispatch(getInfoAction(response.data.access_token));
        navigate('/home')
      })
      .catch((error) => {
        console.log("ceci est une error dans loginAction :")
        console.log(error);
        const errorMessage = formatError(error.code);
        console.log("ceci est une errorMessage return de formatError dans loginAction :" + errorMessage)
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function ActionFailed(data: any) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function updateFailedAction(message: any) {
  return {
    type: UPDATE_FAILED_ACTION,
    payload: message,
  };
}

export function getFriendListConfirmedAction(friendList: any) {
  return {
    type: GET_FRIENDS_LIST_ACTION,
    payload: friendList,
  };
}


export function getFriendInfosAction(data: any) {
  return {
    type: GET_FRIEND_INFOS_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data: any) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload: any) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message: any) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status: any) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function changePageAction() {
  return {
    type: CHANGE_PAGE_ACTION,
  };
}