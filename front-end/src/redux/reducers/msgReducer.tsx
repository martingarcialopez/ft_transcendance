import { T_Msg, T_Action } from "../../type/chat";
import { E_ActionType } from "../../type/Enum";

function initStateMsg(): T_Msg {
  return {
    fromName: "",
    fromId: 0,
    roomId: 0,
    roomName: "",
    content: "",
  };
}

export function msgReducer(state: T_Msg = initStateMsg(), action: T_Action) {
  switch (action.type) {
    case E_ActionType.GET_ROOM_NAME: {
      return { ...state, roomName: action.payload };
    }
    case E_ActionType.GET_ROOM_ID: {
      return { ...state, roomId: action.payload };
    }
    case E_ActionType.GET_CONTENT_MSG: {
      return { ...state, content: action.payload };
    }
    default:
      return state;
  }
}
