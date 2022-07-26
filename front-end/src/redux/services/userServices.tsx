import axios from 'axios';
import { URL_test } from '../../constants/url';

export function signUp(firstname: any, lastname: any, username: any, password: any) {
    const postData = {
        firstname,
        lastname,
        username,
        password,
        avatar: '/shared/avatar/avatar_chat.jpeg',
        returnSecureToken: true,
        twofa: false
    };
    return axios.post(
        `${URL_test}/user/sign-up`,
        postData,
    );
}

export function update(firstname: any, lastname: any, username: any, id: any, avatar: any, status: any, access_token: any, friends: any) {
    const postData = {
        firstname,
        lastname,
        username,
        friends,
        avatar,
        status
    };

    return axios.post(
        `${URL_test}/user/update/${id}`,
        postData,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function enable2FA(access_token: any) {
    return axios.post(
        `${URL_test}/auth/enable2FA`,
        null,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function uploadImage(image: any, access_token: any) {

    const formData = new FormData();
    formData.append('name', 'file');
    formData.append('filename', image.filename)
    formData.append('file', image)

    return axios.post(
        `${URL_test}/user/uploadProfileImage`,
        formData,
        {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'content-type': 'multipart/form-data'
            }
        }
    );
}

export function deleteAccount(access_token: any, id: number) {
    return axios.delete(
        `${URL_test}/user/${id}`,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function disable2FA(access_token: any) {
    return axios.post(
        `${URL_test}/auth/disable2FA`,
        null,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function logout(access_token: any) {
    return axios.post(
        `${URL_test}/auth/logout`,
        null,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function login(username: any, password: any, code: any) {
    const postData = {
        username,
        password,
        code
    };

    return axios.post(
        `${URL_test}/auth/login`,
        postData,
    );
}

export function login42(code: any) {
    return axios.get(
        `${URL_test}/auth/redirect${code}`,
    );
}

export function getInfo(access_token: any) {
    return axios({
        method: 'get',
        url: `${URL_test}/user/current`,
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}

export function getUserInfo(username: any, access_token: any) {
    return axios({
        method: 'get',
        url: `${URL_test}/user/${username}`,
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}

export function getFriendListStatus(access_token: any, username: any) {
    return axios({
        method: 'get',
        url: `${URL_test}/user/friends/status/${username}`,
        headers: { 'Authorization': `Bearer ${access_token}` }
    });
}

export function getAllPlayers() {
    return axios({
        method: 'get',
        url: `${URL_test}/user/all`,
    });
}

export function getAllGames() {
    return axios({
        method: 'get',
        url: `${URL_test}/user/games/all`,
    });
}

export function getAllPlayerGames(username: any) {
    return axios({
        method: 'get',
        url: `${URL_test}/user/games/${username}`,
    });
}

export function addFriend(username: any, access_token: any) {
    return axios.post(
        `${URL_test}/user/friends/${username}`,
        username,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function removeFriend(username: any, access_token: any) {
    return axios.delete(
        `${URL_test}/user/friends/${username}`,
        {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
    );
}

export function formatError(errorResponse: any) {
    // TODO: FAIRE TOUTES LES ERRORS POUR LES CONNECTER CORRECTEMENT
    switch (errorResponse) {
        case 'Request failed with status code 401':
            return 'Account doesn\'t exist';
        case 'Request failed with status code 418':
            return 'Write the 6 digit code you\'re seen on Google Authenticator';
        case 'username already in use':
            return 'Pseudo already in use';
        case 'username should not be empty':
            return 'Pseudo should not be empty';
        case 'username should not be empty,password should not be empty':
            return 'Pseudo and password should not be empty';
        case 'firstname should not be empty':
            return 'Firstname should not be empty';
        case 'lastname should not be empty':
            return 'Lastname should not be empty';
        case 'firstname should not be empty,lastname should not be empty,username should not be empty,password should not be empty':
            return 'Fill all the informations to create your account';
        case 'INVALID_PASSWORD':
            return 'Invalid Password';
        case 'ERR_BAD_REQUEST':
            return 'Username or password invalid';
        default:
            return 'An error arrived';
    }
}

export function saveTokenInLocalStorage(access_token: any, tokenDetails: any) {
    tokenDetails.access_token = access_token;
    tokenDetails.expireDate = new Date(
        new Date().getTime() + 5000000000 * 1000,
    );
    localStorage.setItem('userInfo', JSON.stringify(tokenDetails));
}
