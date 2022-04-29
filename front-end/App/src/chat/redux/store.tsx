import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { chanelReducer, infoReducer } from "./chanelReducer";
import thunk from "redux-thunk";
import { msgReducer, arrayMsgReducer } from "./message";

const reducers = combineReducers({
  channel: chanelReducer /*content all information e*/,
  message: msgReducer,
  info: infoReducer,
  arrayMessage: arrayMsgReducer,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export type RootState = ReturnType<typeof reducers>;
