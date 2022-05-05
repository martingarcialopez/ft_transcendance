import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { chanelReducer, infoReducer } from "./redux/reducers/channelReducers";
import thunk from "redux-thunk";
// import { msgReducer, arrayMsgReducer } from "./redux/reducers/messageReducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './redux/reducers/userReducers'

const reducers = combineReducers({
  userLogin: userLoginReducer,
  // channel: chanelReducer /*content all information e*/,
  // message: msgReducer,
  // info: infoReducer,
  // arrayMessage: arrayMsgReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : undefined

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
} as {}

const middleware = [thunk]

const store = createStore(
  reducers, 
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

//export type RootState = ReturnType<typeof reducers>;
export type RootState = ReturnType<typeof store.getState>

export default store
