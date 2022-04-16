import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import {chanelReducer, msgReducer} from "./chanelReducer"
import thunk from "redux-thunk"


const reducers = combineReducers({
    chanel: chanelReducer,
	message:msgReducer
})

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)
export type RootState = ReturnType<typeof reducers>