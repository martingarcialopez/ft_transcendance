import { T_Action, T_Room } from "../../type/chat";
import { E_ActionType } from "../../type/Enum";
import { Dispatch } from "redux";

export const ac_AddRoom = (room: T_Room) => {
  return (dispatch: Dispatch<T_Action>) => {
    dispatch({
      type: E_ActionType.ADD_NEW_ROOM,
      payload: room,
    });
  };
};

export const ac_InitRoomArray = (room: T_Room[]) => {
  return (dispatch: Dispatch<T_Action>) => {
    dispatch({
      type: E_ActionType.INIT_ROOM_ARRAY,
      payload: room,
    });
  };
};
