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
import { addFriend, removeFriend, formatError, getInfo, getUserInfo, login, saveTokenInLocalStorage, signUp, update, getAllGames, getAllPlayerGames, enable2FA, disable2FA, uploadImage, login42, logout, getFriendListStatus, getAllPlayers, deleteAccount } from '../services/userServices';

export function signupAction(firstname: any, lastname: any, username: any, password: any, navigate: any) {
  return (dispatch: any) => {
    signUp(firstname, lastname, username, password)
      .then((response) => {
        dispatch(loginAction(username, password, null, navigate))
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data.message.toString());
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function updateAction(firstname: any, lastname: any, username: any, id: any, avatar: any, status: any, access_token: any, friends: any) {
  return (dispatch: any) => {
    update(firstname, lastname, username, id, avatar, status, access_token, friends)
      .then((response) => {
        saveTokenInLocalStorage(access_token, response.data);
        dispatch(updateConfirmedAction(response.data))
        //maybe use loginConfirmedAction ?
      })
      .catch((error) => {
        const errorMessage = formatError(error.code);
        //Check l erreur pour expliquer que les infos sont pas update.
        dispatch(updateFailedAction(errorMessage));
      });
  };
}

export function getInfoAction(access_token: any, navigate: NavigateFunction) {
  return (dispatch: any) => {
    getInfo(access_token)
      .then((response) => {
        saveTokenInLocalStorage(access_token, response.data);
        // tokenDetails.expiresIn
        runLogoutTimer(
          dispatch,
          5000000000 * 1000,
          access_token,
          navigate
        );
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

        const storage = localStorage.getItem('userInfo');
        if (storage) {
          const user = JSON.parse(storage);
          user.twofa = true;
          localStorage.setItem('userInfo', JSON.stringify(user));
        }

        dispatch(enable2FAActionConfirmedAction(response.data));
        // navigate('/profile')
      })
      .catch((error) => {
        const errorMessage = formatError(error.code);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function uploadImageAction(userInfo: any, image: any, access_token: any) {
  return (dispatch: any) => {
    uploadImage(image, access_token)
      .then((response) => {

        const storage = localStorage.getItem('userInfo');
        if (storage) {
          const user = JSON.parse(storage);
          user.avatar = response.data.filename;
          localStorage.setItem('userInfo', JSON.stringify(user));
        }
      })
      .catch((error) => {
        const errorMessage = formatError(error.code);
        if (error.response.data.statusCode === 415) {
          alert('Only png images are supported.');
        }
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function deleteAccountAction(access_token: any, id: number, navigate: NavigateFunction) {
  return (dispatch: any) => {
    deleteAccount(access_token, id)
      .then((response) => {
        dispatch(logoutAction(access_token, navigate));
      })
      .catch((error) => {
        const errorMessage = formatError(error.code);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function disable2FAAction(access_token: any) {
  return (dispatch: any) => {
    disable2FA(access_token)
      .then((response) => {

        const storage = localStorage.getItem('userInfo');
        if (storage) {
          const user = JSON.parse(storage);
          user.twofa = false;
          localStorage.setItem('userInfo', JSON.stringify(user));
        }

        dispatch(disable2FAActionConfirmedAction());
        // navigate('/profile')
      })
      .catch((error) => {
        const errorMessage = formatError(error.code);
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
        dispatch(getAllMatch(response.data));
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function getFriendListStatusAction(access_token: any, username: any, friend: boolean) {
  return (dispatch: any) => {
    getFriendListStatus(access_token, username)
      .then((response) => {
        if (friend) {
          dispatch(getFriendListStatusConfirmedAction(response.data));
        }
        else {
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
        const storage = localStorage.getItem('userInfo');
        if (storage) {
          const user = JSON.parse(storage);
          user.friends = response.data;
          localStorage.setItem('userInfo', JSON.stringify(user));
        }
        // dispatch(updateAction(userInfo.firstname, userInfo.lastname, userInfo.username, userInfo.id, userInfo.avatar, userInfo.status, userInfo.access_token, response.data));
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

export function removeFriendAction(username: any, userInfo: any) {
  return (dispatch: any) => {
    removeFriend(username, userInfo.access_token)
      .then(() => {
        dispatch(getFriendListAction(userInfo));
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
  return (dispatch: any) => {
    login(username, password, code)
      .then((response) => {
        dispatch(getInfoAction(response.data.access_token, navigate));
        navigate('/home')
      })
      .catch((error) => {
        const errorMessage = formatError(error.message);
        dispatch(ActionFailed(errorMessage));
      });
  };
}

export function login42Action(code: any, navigate: NavigateFunction) {
  return (dispatch: any) => {
    login42(code)
      .then((response) => {
        dispatch(getInfoAction(response.data.access_token, navigate));
        navigate('/home')
      })
      .catch((error) => {
        const errorMessage = formatError(error.message);
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