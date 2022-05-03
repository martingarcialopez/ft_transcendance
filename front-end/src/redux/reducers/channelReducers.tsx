import { listChanel } from "../data";

import {
  t_channel,
  e_actionType,
  t_ActionChanel,
  t_ActionInfo,
  t_info,
} from "../constants/channelConstants";

function initialState(): t_channel[] {
  return listChanel;
}

export function initChannel(): t_channel {
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

/**
 * set each propriety of object message
 * each case is related to a propriety object

 * @param action{proprity : ENUME , proprity:any}
 * @returns
 * @state = {
  name: string;
  id: number;
  typeChannel: string; //type to typeChannel
  password: string;
  owner: string;
  members: string[];
  message: t_msgInChannel[];
};
 */
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
