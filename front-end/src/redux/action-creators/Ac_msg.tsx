import { T_Action } from "../../type/chat";
import { E_ActionType } from "../../type/Enum";
import { Dispatch } from "redux";

/**
 * all functions concern  action when user selected a user/group at the left bars
 * each action do something like  update or add a proprietie to the  object T_msg
 */
export const ac_getIdRoomMsg = (id: number) => {
  return (dispatch: Dispatch<T_Action>) => {
    dispatch({
      type: E_ActionType.GET_ROOM_ID,
      payload: id,
    });
  };
};

export const ac_getContentMsg = (content: string) => {
  return (dispatch: Dispatch<T_Action>) => {
    dispatch({
      type: E_ActionType.GET_CONTENT_MSG,
      payload: content,
    });
  };
};

export const ac_getUserId = (id: number) => {
  return (dispatch: Dispatch<T_Action>) => {
    dispatch({
      type: E_ActionType.ID_CURRENT_USER,
      payload: id,
    });
  };
};
