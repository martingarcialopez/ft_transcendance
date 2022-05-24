import { E_ActionType } from "../../type/Enum";
import { T_Action, T_Msg } from "../../type/chat";

/**
 * this function going to init the state, with the default propriety value
 */
function initStateMsg(): T_Msg {
  return {
    fromName: "",
    fromId: -1,
    roomId: -1,
    roomName: "",
    content: "",
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
export function msgReducer(state: T_Msg = initStateMsg(), action: T_Action) {
  switch (action.type) {
    /* case E_ActionType.MSG_RECEIVED: {
     *   return { ...state, contentReceived: action.payload };
     * }
     * case E_ActionType.CHANEL_RECIPIENT: {
     *   return { ...state, destChannel: action.payload };
     * } */
    case E_ActionType.ID_CURRENT_USER: {
      return { ...state, fromId: action.payload };
    }
    case E_ActionType.GET_CONTENT_MSG: {
      return { ...state, content: action.payload };
    }
    case E_ActionType.GET_ROOM_ID: {
      return { ...state, roomId: action.payload };
    }

    default:
      return state;
  }
}
