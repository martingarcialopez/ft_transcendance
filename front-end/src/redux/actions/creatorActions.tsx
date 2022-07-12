import { T_Action } from "../../type/chat";
import { E_ActionType } from "../../type/Enum";
import { Dispatch } from "redux";

/*
 * export const ac_addRoomName = (name: string) => {
 *   return (dispatch: Dispatch<T_Action>) => {
 *     dispatch({
 *       type: E_ActionType.GET_ROOM_NAME,
 *       payload: name,
 *     });
 *   };
 * };
 *
 * export const ac_addRoomId = (id: number) => {
 *   return (dispatch: Dispatch<T_Action>) => {
 *     dispatch({
 *       type: E_ActionType.GET_ROOM_ID,
 *       payload: id,
 *     });
 *   };
 * };
 *
 * export const ac_contentMsg = (content: string) => {
 *   return (dispatch: Dispatch<T_Action>) => {
 *     dispatch({
 *       type: E_ActionType.ADD_CONTENT_MSG,
 *       payload: content,
 *     });
 *   };
 * }; */

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

export const ac_getNameRoomMsg = (name: string) => {
  return (dispatch: Dispatch<T_Action>) => {
    dispatch({
      type: E_ActionType.GET_ROOM_NAME,
      payload: name,
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
