import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  LOGOUT_ACTION,
  LOGIN_FAILED_ACTION,
  SIGNUP_FAILED_ACTION
} from '../constants/userConstants'
import { formatError, login, signUp } from '../services/userServices';

export function signupAction(firstname: any, lastname: any, email: any, password: any) {
  return (dispatch: any) => {
      signUp(firstname, lastname, email, password)
          .then((response) => {
              dispatch(confirmedSignupAction(response.data));
          })
          .catch((error) => {
              const errorMessage = formatError(error.response.data);
              dispatch(signupFailedAction(errorMessage));
          });
  };
}

export function logout() {
  localStorage.removeItem('userDetails');
  return {
      type: LOGOUT_ACTION,
  };
}

export function loginAction(email: any, password: any) {
  return (dispatch: any) => {
      login(email, password)
          .then((response) => {
              dispatch(loginConfirmedAction(response.data));
          })
          .catch((error) => {
              const errorMessage = formatError(error.response.data);
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

// export const login =
//   (
//     username: String,
//     password: String
//   ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
//     async (
//       dispatch: ThunkDispatch<RootState, unknown, AnyAction>
//     ): Promise<void> => {
//       try {
//         dispatch({
//           type: LOADING_TOGGLE_ACTION,
//         })

//         const response = await fetch('http://localhost:3000/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             username,
//             password
//           }),
//         })

//         console.log(response.status);
//         // FAIRE UN CATCH ERROR STATUS POUR 201
//         const data = await response.json()
//         console.log("Ceci est data:" + data);
//         console.log("Ceci est data.access_token:" + data.access_token);

//         const responseData = await fetch('http://localhost:3000/user/current', {
//           method: 'GET',
//           headers: { 'Authorization': `Bearer ${data.access_token}` }
//         })

//         const data2 = await responseData.json()
//         console.log(data2);

//         const userData = {
//           avatar: data2.avatar,
//           firstName: data2.firstname,
//           id: data2.id,
//           isActive: data2.isActive,
//           lastName: data2.lastname,
//           login42: data2.login42,
//           access_token: data.access_token,
//           password: data2.password,
//           username: data2.username
//         }

//         console.log(userData);

//         dispatch({
//           type: LOGIN_CONFIRMED_ACTION,
//           payload: userData,
//         })

//         localStorage.setItem('userInfo', JSON.stringify(userData))
//       } catch (error: any) {
//         console.log("ON A FOIRE");
//         dispatch({
//           type: LOGIN_FAILED_ACTION,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         })
//       }
//     }

// export const signup =
//   (
//     firstname: String,
//     lastname: String,
//     username: String,
//     password: String,
//   ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
//     async (
//       dispatch: ThunkDispatch<RootState, unknown, AnyAction>
//     ): Promise<void> => {
//       try {
//         dispatch({
//           type: LOADING_TOGGLE_ACTION,
//         })

//         const response = await fetch('http://localhost:3000/user/sign-up', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             firstname,
//             lastname,
//             username,
//             password,
//           }),
//         })

//         console.log(response.status);
//         // FAIRE UN CATCH ERROR STATUS POUR 201
//         const data = await response.json()
//         console.log("Ceci est signup data:" + data);

//         const userData = {
//           avatar: data.avatar,
//           firstName: data.firstname,
//           id: data.id,
//           isActive: data.isActive,
//           lastName: data.lastname,
//           login42: data.login42,
//           access_token: data.access_token,
//           password: data.password,
//           username: data.username
//         }
//         // IL N Y A PAS DE TOKEN !!
//         console.log("Ceci est data.access_token:" + data.access_token);

//         // const responseData = await fetch('http://localhost:3000/user/current', {
//         //   method: 'GET',
//         //   headers: { 'Authorization': `Bearer ${data.access_token}` }
//         // })

//         // const data2 = await responseData.json()
//         // console.log(data2);

//         // const userData = {
//         //   avatar: data2.avatar,
//         //   firstName: data2.firstname,
//         //   id: data2.id,
//         //   isActive: data2.isActive,
//         //   lastName: data2.lastname,
//         //   login42: data2.login42,
//         //   access_token: data.access_token,
//         //   password: data2.password,
//         //   username: data2.username
//         // }

//         console.log(userData);

//         dispatch({
//           type: LOGIN_CONFIRMED_ACTION,
//           payload: userData,
//         })

//         localStorage.setItem('userInfo', JSON.stringify(userData))
//       } catch (error: any) {
//         console.log("ON A FOIRE");
//         dispatch({
//           type: LOGIN_FAILED_ACTION,
//           payload:
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message,
//         })
//       }
//     }

// export function logout() {
//   return (dispatch: Dispatch) => {
//       localStorage.removeItem('userInfo')
//       dispatch({ type: LOGOUT_ACTION })

//       // await fetch('http://localhost:3000/auth/logout', {
//       //   headers: { 'Content-Type': 'application/json' },
//       //   credentials: 'include',
//       // })
//     }
// }
