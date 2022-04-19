import { Dispatch } from "redux";
import { t_chanel, e_actionType, t_ActionChanel, t_ActionMsg } from "../type";

export const ActionCreatorChanelAdd = (amount: t_chanel) => {
  return (dispatch: Dispatch<t_ActionChanel>) => {
    dispatch({
      type: e_actionType.ADD,
      payload: amount,
    });
  };
};

export const ActionCreatorMsgReceived = (newMsg: string[]) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.MSG_RECEIVED,
      payload: newMsg,
    });
  };
};

/* export const ActionCreatorMsgSetMembers = (name: string[]) => {
 *   return (dispatch: Dispatch<t_ActionMsg>) => {
 *     dispatch({
 *       type: e_actionType.MEMBERS,
 *       payload: name,
 *     });
 *   };
 * }; */

export const ActionCreatorMsgChanel = (name: t_chanel) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.CHANEL_RECIPIENT,
      payload: name,
    });
  };
};

export const ActionCreatorMsgToSend = (name: string[]) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.MSG_TO_SEND,
      payload: name,
    });
  };
};
