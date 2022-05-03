import { e_actionType, t_ActionMsg, t_msgToSend } from "../constants/channelConstants";

/**
 * this function going to init the state, with the default propriety value
 */
function initStateMsg(): t_msgToSend {
  return {
    fromUser: "unknow",
    contentToSend: "",
    channelIdDst: -1,
    channelName: "",
  };
}

/**
 * set each propriety of object message
 * each case is related to a propriety object
 * @param state{
	fromUser: "unknow",
	contentToSend: "",
	channelIdDst: -1,
	channelName: "",
  };
 * @param action{proprity : ENUME , proprity:any}
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
/**
 * added new t_msgToSend into the array
 * @state[t_msgToSend, t_msgToSend, t_msgToSend...]
 * @param action{proprity : ENUME , proprity:any}
 */
export function arrayMsgReducer(
  state: t_msgToSend[] = [],
  action: t_ActionMsg
) {
  switch (action.type) {
    case e_actionType.ADD_NEW_MSG: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
