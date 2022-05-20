import axios from 'axios';
import { URL_test } from '../../constants/url';
import { loginConfirmedAction, logout } from '../actions/userActions';


export function signUp(firstname: any, lastname: any, username: any, password: any) {
    const postData = {
        firstname,
        lastname,
        username,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        `${URL_test}/user/sign-up`,
        postData,
    );
}

export function login(username: any, password: any) {
    const postData = {
        username,
        password,
    };

    return axios.post(
        `${URL_test}/auth/login`,
        postData,
    );
}

export function getInfo(access_token: any) {
    console.log("getInfo TOKEN :")
    console.log(access_token)
    return axios({
        method: 'get',
        url: `${URL_test}/user/current`,
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}

export function getUserInfo(username: any, access_token: any) {
    console.log("getUserInfo TOKEN :")
    console.log(access_token)
    console.log("getUserInfo USERNAME :", username)
    return axios({
        method: 'get',
        url: `${URL_test}/user/${username}`,
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}

export function formatError(errorResponse: any) {
    // TODO: FAIRE TOUTES LES ERRORS POUR LES CONNECTER CORRECTEMENT
    console.log("Ceci est l err return dans la fct formatError :")
    console.log(errorResponse)
    switch (errorResponse) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';
        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD':
            return 'Invalid Password';
        case 'USER_DISABLED':
            return 'User Disabled';
        case 'ERR_BAD_REQUEST':
            return 'Username or password invalid';
        default:
            return 'An error arrived';
    }
}

export function saveTokenInLocalStorage(access_token: any, tokenDetails: any) {
    console.log("Dans saveToken le token :")
    console.log(tokenDetails)
    console.log("Dans saveToken le token expiresIn :")
    console.log(tokenDetails.expiresIn)
    // tokenDetails.expiresIn
    tokenDetails.access_token = access_token;
    tokenDetails.expireDate = new Date(
        new Date().getTime() + 5000000000 * 1000,
    );
    console.log("Dans saveToken apres expireDate add + tokenAdd token :", tokenDetails)
    console.log("Dans saveToken JSON mode :", JSON.stringify(tokenDetails))
    localStorage.setItem('userInfo', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch: any, timer: any) {
    setTimeout(() => {
        dispatch(logout());
    }, timer);
}

export function checkAutoLogin(dispatch: any) {
    const tokenDetailsString = localStorage.getItem('userInfo');
    let tokenDetails: any = '';
    if (!tokenDetailsString) {
        dispatch(logout());
        return;
    }

    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();

    if (todaysDate > expireDate) {
        dispatch(logout());
        return;
    }
    dispatch(loginConfirmedAction(tokenDetails));

    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer);
}
