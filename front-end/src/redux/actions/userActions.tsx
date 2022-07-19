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
  GET_ALL_GAMES_ACTION,
  UPDATE_CONFIRMED_ACTION,
  ENABLE_2FA_CONFIRMED_ACTION,
  DISABLE_2FA_CONFIRMED_ACTION,
  UPLOAD_IMAGE_CONFIRMED_ACTION,
  GET_FRIENDS_LIST_FOR_FRIEND_ACTION,
  GET_ALL_PLAYERS_ACTION,
} from '../constants/userConstants'
import { addFriend, removeFriend, formatError, getInfo, getUserInfo, login, saveTokenInLocalStorage, signUp, update, getAllGames, getAllPlayerGames, enable2FA, disable2FA, uploadImage, login42, logout, getFriendListStatus, getAllPlayers } from '../services/userServices';

export function signupAction(firstname: any, lastname: any, username: any, password: any, navigate: any) {
  return (dispatch: any) => {
    signUp(firstname, lastname, username, password)
      .then((response) => {
        console.log("signupAction response : ")
        console.log(response)
        dispatch(loginAction(username, password, null, navigate))
      })
      .catch((error) => {
        console.log("ceci est une error dans signupAction error.response.data.message:", error.response.data.message)
        console.log("error :", error);
        const errorMessage = formatError(error.response.data.message.toString());
        console.log("ceci est une errorMessage return de formatError dans signupAction :" + errorMessage)
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function updateAction(firstname: any, lastname: any, username: any, id: any, avatar: any, status: any, access_token: any, friends: any) {
  return (dispatch: any) => {
    update(firstname, lastname, username, id, avatar, status, access_token, friends)
      .then((response) => {
        console.log("updateAction response : ")
        console.log(response)
        saveTokenInLocalStorage(access_token, response.data);
        dispatch(updateConfirmedAction(response.data))
        //maybe use loginConfirmedAction ?
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

export function getInfoAction(access_token: any, navigate: NavigateFunction) {
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
          access_token,
          navigate
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

export function enable2FAAction(access_token: any) {
  return (dispatch: any) => {
    enable2FA(access_token)
      .then((response) => {
        console.log("enable2FAAction qui fct :")
        console.log(response)
        console.log("enable2FAAction data qui fct :")
        console.log(response.data)
        dispatch(enable2FAActionConfirmedAction(response.data));
        // navigate('/profile')
      })
      .catch((error) => {
        console.log("ceci est une error dans enable2FAAction :")
        console.log(error);
        const errorMessage = formatError(error.code);
        console.log("ceci est une errorMessage return de formatError dans enable2FAAction :" + errorMessage)
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function uploadImageAction(userInfo: any, image: any, access_token: any) {
  return (dispatch: any) => {
    uploadImage(image, access_token)
      .then((response) => {
        console.log("uploadImageAction qui fct :")
        console.log(response)
        console.log("uploadImageAction data qui fct :")
        console.log(response.data)
        console.log("uploadImageAction data filename qui fct :")
        console.log(response.data.filename)

        // const storage = localStorage.getItem('userInfo');
        // if (storage) {
        //     const user = JSON.parse(storage);
        //     console.log(`previous avatar was ${user.avatar}`)
        //     user.avatar = response.data.filename;
        //     console.log(`new avatar is ${response.data.filename}`)
        //     localStorage.setItem('userInfo', JSON.stringify(user));
        // }

        dispatch(updateAction(userInfo.firstname, userInfo.lastname, userInfo.username, userInfo.id, response.data.filename, userInfo.status, userInfo.access_token, userInfo.friends));
      })
      .catch((error) => {
        console.log("ceci est une error dans uploadImageAction :")
        console.log(error);
        const errorMessage = formatError(error.code);
          console.log("ceci est une errorMessage return de formatError dans uploadImageAction :" + errorMessage)
		  if (error.response.data.statusCode === 415) {
			  alert('Only png images are supported.');
		  }
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function disable2FAAction(access_token: any) {
  return (dispatch: any) => {
    disable2FA(access_token)
      .then((response) => {
        console.log("disable2FAAction qui fct :")
        console.log(response)
        console.log("disable2FAAction data qui fct :")
        console.log(response.data)
        dispatch(disable2FAActionConfirmedAction());
        // navigate('/profile')
      })
      .catch((error) => {
        console.log("ceci est une error dans disable2FAAction :")
        console.log(error);
        const errorMessage = formatError(error.code);
        console.log("ceci est une errorMessage return de formatError dans disable2FAAction :" + errorMessage)
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

export function getAllPlayersAction() {
  return (dispatch: any) => {
    getAllPlayers()
      .then((response) => {
        console.log("getAllPlayersAction response", response)
        dispatch(getAllPlayersSuccess(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getAllGamesAction() {
  return (dispatch: any) => {
    getAllGames()
      .then((response) => {
        console.log("getAllGamesAction response", response)
        dispatch(getAllMatch(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getAllPlayerGamesAction(username: any) {
  return (dispatch: any) => {
    getAllPlayerGames(username)
      .then((response) => {
        console.log("getAllPlayerGamesAction response", response)
        dispatch(getAllMatch(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getFriendListStatusAction(access_token: any, username: any, friend: boolean) {
  console.log("getFriendListStatusAction access_token", access_token)
  console.log("getFriendListStatusAction username", username)
  return (dispatch: any) => {
    getFriendListStatus(access_token, username)
      .then((response) => {
        if (friend) {
          console.log("getFriendListStatusAction response => getFriendListStatusConfirmedAction", response)
          dispatch(getFriendListStatusConfirmedAction(response.data));
        }
        else {
          console.log("getFriendListStatusAction response => getFriendListStatusForFriendConfirmedAction", response)
          dispatch(getFriendListStatusForFriendConfirmedAction(response.data));
        }
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getFriendListAction(userInfo: any) {
  return (dispatch: any) => {
    getFriendListStatus(userInfo.access_token, userInfo.username)
      .then((response) => {
        console.log("getFriendListAction response", response)
        dispatch(updateAction(userInfo.firstname, userInfo.lastname, userInfo.username, userInfo.id, userInfo.avatar, userInfo.status, userInfo.access_token, response.data));
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
      .then((response) => {
        console.log("addFriendAction response", response)
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
export function logoutAction(access_token: any, navigate: NavigateFunction) {
  return (dispatch: any) => {
    logout(access_token)
      .then((response) => {
        console.log("logoutAction qui fct :")
        console.log(response)
        console.log("logoutAction data qui fct :")
        console.log(response.data)
        dispatch(logoutSuccess());
        navigate('/home')
      })
      .catch((error) => {
        dispatch(logoutSuccess());
        navigate('/home')
      });
  };
}

export function loginAction(username: any, password: any, code: any, navigate: NavigateFunction) {
  console.log("loginAction username", username)
  console.log("loginAction password", password)
  console.log("loginAction code", code)
  return (dispatch: any) => {
    login(username, password, code)
      .then((response) => {
        console.log("loginAction qui fct :")
        console.log(response)
        console.log("loginAction data qui fct :")
        console.log(response.data)
        console.log("loginAction data access qui fct :")
        console.log(response.data.access_token)
        dispatch(getInfoAction(response.data.access_token, navigate));
        navigate('/home')
      })
      .catch((error) => {
        console.log("ceci est une error dans loginAction :")
        console.log(error);
        const errorMessage = formatError(error.message);
        console.log("ceci est une errorMessage return de formatError dans loginAction :" + errorMessage)
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function login42Action(code: any, navigate: NavigateFunction) {
  console.log("login42Action code", code)
  return (dispatch: any) => {
    login42(code)
      .then((response) => {
        console.log("login42Action qui fct :")
        console.log(response)
        console.log("login42Action data qui fct :")
        console.log(response.data)
        console.log("login42Action data access qui fct :")
        console.log(response.data.access_token)
        dispatch(getInfoAction(response.data.access_token, navigate));
        navigate('/home')
      })
      .catch((error) => {
        console.log("ceci est une error dans login42Action :")
        console.log(error);
        const errorMessage = formatError(error.message);
        console.log("ceci est une errorMessage return de formatError dans login42Action :" + errorMessage)
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function runLogoutTimer(dispatch: any, timer: any, access_token: any, navigate: NavigateFunction) {
  setTimeout(() => {
    dispatch(logoutAction(access_token, navigate));
  }, timer);
}

export function checkAutoLogin(dispatch: any, access_token: any, navigate: NavigateFunction) {
  const tokenDetailsString = localStorage.getItem('userInfo');
  let tokenDetails: any = '';
  if (!tokenDetailsString) {
    dispatch(logoutAction(access_token, navigate));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(logoutAction(access_token, navigate));
    return;
  }
  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, access_token, navigate);
}

export function logoutSuccess() {
  localStorage.removeItem('userInfo');
  return {
    type: LOGOUT_ACTION,
  };
}

export function getAllPlayersSuccess(data: any) {
  return {
    type: GET_ALL_PLAYERS_ACTION,
    payload: data,
  };
}

export function getAllMatch(data: any) {
  return {
    type: GET_ALL_GAMES_ACTION,
    payload: data,
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

export function getFriendListStatusConfirmedAction(friendList: any) {
  return {
    type: GET_FRIENDS_LIST_ACTION,
    payload: friendList,
  };
}

export function getFriendListStatusForFriendConfirmedAction(friendList: any) {
  return {
    type: GET_FRIENDS_LIST_FOR_FRIEND_ACTION,
    payload: friendList,
  };
}

export function getFriendInfosAction(data: any) {
  return {
    type: GET_FRIEND_INFOS_ACTION,
    payload: data,
  };
}

export function uploadImageActionConfirmedAction(data: any) {
  console.log("uploadImageActionConfirmedAction data", data)
  return {
    type: UPLOAD_IMAGE_CONFIRMED_ACTION,
    payload: data,
  };
}

export function enable2FAActionConfirmedAction(data: any) {
  return {
    type: ENABLE_2FA_CONFIRMED_ACTION,
    payload: data,
  };
}

export function disable2FAActionConfirmedAction() {
  return {
    type: DISABLE_2FA_CONFIRMED_ACTION,
  };
}

export function updateConfirmedAction(data: any) {
  return {
    type: UPDATE_CONFIRMED_ACTION,
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
  console.log("signupFailedAction message:", message)
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