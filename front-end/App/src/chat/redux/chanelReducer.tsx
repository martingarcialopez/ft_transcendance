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
    contentReceived: [],
    from: "it going to be the information about about who is send data",
    destChannel: initChanel(),
    contentToSend: [],
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
    case e_actionType.MSG_RECEIVED: {
      return { ...state, contentReceived: action.payload };
    }
    case e_actionType.CHANEL_RECIPIENT: {
      return { ...state, destChannel: action.payload };
    }
    case e_actionType.MSG_TO_SEND: {
      return { ...state, contentToSend: action.payload };
    }

    default:
      return state;
  }
}
