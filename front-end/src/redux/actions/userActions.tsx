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
} from '../constants/userConstants'
import { formatError, getInfo, getUserInfo, login, runLogoutTimer, saveTokenInLocalStorage, signUp } from '../services/userServices';

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
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function getUserInfoAction(username: any, access_token: any, navigate: NavigateFunction) {
  return (dispatch: any) => {
    getUserInfo(username, access_token)
      .then((response) => {
        dispatch(getFriendInfosAction(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
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
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data: any) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
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