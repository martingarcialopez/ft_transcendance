import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { chanelReducer, msgReducer, infoReducer } from "./chanelReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  chanel:
    chanelReducer /*content all information about chanel inside database*/,
  message: msgReducer,
  info: infoReducer,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export type RootState = ReturnType<typeof reducers>;
