import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { msgReducer } from "./reducers/msgReducer";
import { roomReducer } from "./reducers/roomReducer";

const reducers = combineReducers({
  message: msgReducer,
  arrayRoom: roomReducer,
});

export const store = createStore(reducers, {}, applyMiddleware(thunk));
export type RootState = ReturnType<typeof reducers>;
