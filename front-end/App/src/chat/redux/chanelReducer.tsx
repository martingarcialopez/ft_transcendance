import { listChanel } from "../data";

import {
  t_channel,
  e_actionType,
  t_ActionChanel,
  t_ActionMsg,
  t_msgToSend,
  t_ActionInfo,
  t_info,
} from "../type";

function initialState(): t_channel[] {
  return listChanel;
}

export function chanelReducer(
  state: t_channel[] = initialState(),
  action: t_ActionChanel
) {
  switch (action.type) {
    case e_actionType.ADD:
      return [...state, action.payload];
    case e_actionType.SET_ID_CHANNEL:
      return [...state, action.payload];
    default:
      return state;
  }
}

function initChanel(): t_channel {
  return {
    name: "",
    id: -1,
    typeChannel: "",
    password: "",
    owner: "",
    members: [],
    message: [],
  };
}

function initStateMsg(): t_msgToSend {
  return {
    fromUser: "it going to be the information about about who is send data",
    contentToSend: "",
    channelIdDst: -1,
    channelName: "",
  };
}

/**
 * define the propriety of message(from, to, content)
 * @param state
 * @param action
 * @returns
 */
export function msgReducer(
  state: t_msgToSend = initStateMsg(),
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
    case e_actionType.SET_ID_CHANNEL: {
      return { ...state, channelIdDst: action.payload };
    }
    case e_actionType.SET_NAME_CHANNEL: {
      return { ...state, channelName: action.payload };
    }
    default:
      return state;
  }
}

function initInfo(): t_info {
  return {
    titleOfPage: "",
  };
}

/**
 *
 */
export function infoReducer(state = initInfo(), action: t_ActionInfo): t_info {
  switch (action.type) {
    case e_actionType.NAME_OF_CURRENT_CHANNEL:
      return { ...state, titleOfPage: action.payload };
    default:
      return state;
  }
}
