import axios from 'axios';


export function signUp(firstname: any, lastname: any, username: any, password: any) {
    const postData = {
        firstname,
        lastname,
        username,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        `http://localhost:3000/user/sign-up`,
        postData,
    );
}

export function login(username: any, password: any) {
    const postData = {
        username,
        password,
        returnSecureToken: true,
    };

    return axios.post(
        `http://localhost:3000/auth/login`,
        postData,
    );
}

export function getInfo(access_token: any) {
    return axios({
        method: 'get',
        url: `http://localhost:3000/auth/login`,
        headers: {'Authorization': access_token}
    });
}


export function formatError(errorResponse: any) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            return 'Email already exists';

        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD':
            return 'Invalid Password';
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

// export function saveTokenInLocalStorage(tokenDetails) {
//     tokenDetails.expireDate = new Date(
//         new Date().getTime() + tokenDetails.expiresIn * 1000,
//     );
//     localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
// }

// export function runLogoutTimer(dispatch, timer, history) {
//     setTimeout(() => {
//         dispatch(logout(history));
//     }, timer);
// }

// export function checkAutoLogin(dispatch, history) {
//     const tokenDetailsString = localStorage.getItem('userDetails');
//     let tokenDetails = '';
//     if (!tokenDetailsString) {
//         dispatch(logout(history));
//         return;
//     }

//     tokenDetails = JSON.parse(tokenDetailsString);
//     let expireDate = new Date(tokenDetails.expireDate);
//     let todaysDate = new Date();

//     if (todaysDate > expireDate) {
//         dispatch(logout(history));
//         return;
//     }
//     dispatch(loginConfirmedAction(tokenDetails));

//     const timer = expireDate.getTime() - todaysDate.getTime();
//     runLogoutTimer(dispatch, timer, history);
// }
