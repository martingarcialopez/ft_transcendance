import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
} from "../constants/userConstants";
import { RootState } from "../../store";

export const login =
  (
    username: String,
    password: String
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>
  ): Promise<void> => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log(response.status);
      // FAIRE UN CATCH ERROR STATUS POUR 201
      const data = await response.json();
      console.log("Ceci est data:" + data);
      console.log("Ceci est data.access_token:" + data.access_token);

      const responseData = await fetch("http://localhost:3000/user/current", {
        method: "GET",
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      const data2 = await responseData.json();
      console.log(data2);

      const userData = {
        avatar: data2.avatar,
        firstName: data2.firstname,
        id: data2.id,
        isActive: data2.isActive,
        lastName: data2.lastname,
        login42: data2.login42,
        access_token: data.access_token,
        password: data2.password,
        username: data2.username,
      };

      console.log(userData);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userData,
      });

      localStorage.setItem("userInfo", JSON.stringify(userData));
    } catch (error: any) {
      console.log("ON A FOIRE");
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });

    // await fetch('http://localhost:3000/auth/logout', {
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    // })
  };
