import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
/* import { msgReducer } from "./reducers/msgReducer"; */
import { composeWithDevTools } from "redux-devtools-extension";
import { allMatchReducer, userLoginReducer } from "./reducers/userReducers";
import { roomReducer } from "./reducers/roomReducer";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  allMatch: allMatchReducer,
  /* message: msgReducer, */
  arrayRoom: roomReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : undefined;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
} as {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
