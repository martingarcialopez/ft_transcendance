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

export const ActionCreatorMsgIdchannelDsl = (name: number) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.SET_ID_CHANNEL,
      payload: name,
    });
  };
};

export const ActionCreatorMsgContent = (name: string) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.MSG_TO_SEND,
      payload: name,
    });
  };
};

export const ActionCreatorInfo = (name: string) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.NAME_OF_CURRENT_CHANNEL,
      payload: name,
    });
  };
};

export const ActionCreatorIdChannel = (id: number) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.SET_ID_CHANNEL,
      payload: id,
    });
  };
};

export const ActionCreatorNameChannel = (name: string) => {
  return (dispatch: Dispatch<t_ActionMsg>) => {
    dispatch({
      type: e_actionType.SET_NAME_CHANNEL,
      payload: name,
    });
  };
};
