export type t_msgInChannel = {
  user: any;
  content: string;
};

export type t_channel = {
  name: string;
  id: number;
  typeChannel: string; //type to typeChannel
  password: string;
  owner: string;
  members: string[];
  message: t_msgInChannel[];
};

export type t_msgToSend = {
  fromUser: string;
  contentToSend: string;
  channelIdDst: number;
  channelName: string;
};

export enum e_actionType {
  SET_CHANEL = "setting-chanel",
  TEXT_FIELD = "text Filed",
  ADD = "add new chanel",
  MSG_RECEIVED = "new msg arrived",
  RECIPIENT = "define the recipient of message",
  MEMBERS = "set the members of chanel",
  CHANEL_RECIPIENT = "define the chanel recipient for the message",
  MSG_TO_SEND = "message to send to a chanel room",
  NAME_OF_CURRENT_CHANNEL = "the name of current chanel",
  USER_SETTING_PAGE = "led user setting page",
  SET_ID_CHANNEL = "define the id channel",
  SET_NAME_CHANNEL = "define the name of channel",
}

export type t_ActionChanel = {
  type: string;
  payload: t_channel;
};

export type t_ActionMsg = {
  type: string;
  payload: any;
};

export type t_ActionInfo = {
  type: string;
  payload: string;
};

export type t_info = {
  titleOfPage: string;
};
