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
    };

    return axios.post(
        `http://localhost:3000/auth/login`,
        postData,
    );
}

export function getInfo(access_token: any) {
    console.log("getInfo TOKEN :")
        console.log(access_token)
    return axios({
        method: 'get',
        url: `http://localhost:3000/user/current`,
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
            return 'Pseudo not found';
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
