import { listChanel } from "../data";

import {
  t_chanel,
  e_actionType,
  t_ActionChanel,
  t_ActionMsg,
  t_stateMsg,
} from "../type";

function initialState(): t_chanel[] {
  return listChanel;
}

export function chanelReducer(
  state: t_chanel[] = initialState(),
  action: t_ActionChanel
) {
  switch (action.type) {
    case e_actionType.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
}

function initChanel(): t_chanel {
  return {
    name: "",
    type: "",
    password: "",
    owner: "",
    members: [],
  };
}

function initStateMsg(): t_stateMsg {
  return {
    content: [],
    from: "",
    to: "",
    members: [],
    chanel: initChanel(),
  };
}

/**
 * define the propriety of message(from, to, content)
 * @param state
 * @param action
 * @returns
 */
export function msgReducer(
  state: t_stateMsg = initStateMsg(),
  action: t_ActionMsg
) {
  switch (action.type) {
    case e_actionType.NEW_MSG: {
      return { ...state, content: action.payload };
    }
    case e_actionType.RECIPIENT: {
      return { ...state, to: action.payload };
    }
    case e_actionType.MEMBERS: {
      return { ...state, members: action.payload };
    }
    case e_actionType.CHANEL_RECIPIENT: {
      return { ...state, chanel: action.payload };
    }
    default:
      return state;
  }
}
