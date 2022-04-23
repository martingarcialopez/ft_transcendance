import React from "react";
import "./style/index.css";
import { useReducer } from "react";
import { LeftMenu } from "./leftMenu";
import { e_actionType } from "./type";
import { TextField } from "./conversation";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { RightMenu } from "./rightMenu";

/**
 * this page is the layout of chat page , like a home page of chat
 *
 */
type Action = {
  type: string;
  payload: Function;
};

type t_state = {
  theDispatch: Function;
  theState: any;
};

function initialState(): t_state {
  return {
    theDispatch: TextField,
    theState: e_actionType.TEXT_FIELD,
  };
}

/**
 * this reducer let to handle the changing page
 * @param state handle all clic on the patern
 * @param action
 * @returns
 */
function handleClickReducer(state: t_state, action: Action): t_state {
  switch (action.type) {
    case e_actionType.SET_CHANEL:
      return { ...state, theDispatch: action.payload };
    case e_actionType.TEXT_FIELD:
      return { ...state, theDispatch: action.payload };
    case e_actionType.USER_SETTING_PAGE:
      return { ...state, theDispatch: action.payload };

    default:
      return state;
  }
}

/* function initialState(): t_state {
 *   return {
 *     theDispatch: TextField,
 *     theState: e_actionType.TEXT_FIELD,
 *   };
 * } */

export const MyGlobalContext = React.createContext<t_state | undefined>(
  undefined
);

/**
 * patern of the chat
 * prten of chat
 * @returns
 */
function LayoutChat(): JSX.Element {
  const [state, dispatch] = useReducer(handleClickReducer, initialState());
  return (
    <div className="container">
      <Provider store={store}>
        <MyGlobalContext.Provider
          value={{
            theState: state,
            theDispatch: dispatch,
          }}
        >
          <div className="items-1 item list">
            <LeftMenu />
          </div>

          <div id="items-2" className="items-2 item">
            {" "}
            <state.theDispatch />{" "}
          </div>

          <div className="items-3 item list">
            <RightMenu />
          </div>
        </MyGlobalContext.Provider>
      </Provider>
    </div>
  );
}

export default LayoutChat;
