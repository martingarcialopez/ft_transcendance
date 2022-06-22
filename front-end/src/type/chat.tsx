export type T_User = {
  avatar: string;
  blockList: [];
  firstname: string;
  id: number;
  isActive: boolean;
  lastname: string;
  login42: string;
  password: string;
  username: string;
};

export type T_Participant = {
  id: number;
  roomId: number;
  user: T_User[];
  userId: number;
};

export type T_Room = {
  name: string;
  id: number;
  typeRoom: string;
  password: string;
  owner: number[];
  /* members: number[]; */
  /* participants: []; */
  participants: T_Participant[];
  avatar: string;
};

export type T_Msg = {
  fromName: string;
  fromId: number;
  roomId: number;
  roomName: string;
  content: string;
};
/*
 * export type T_User = {
 *   name: string;
 *   id: number;
 *   avatar: string;
 * };
 *  */
export type T_Action = {
  type: string;
  payload: any;
};

export type T_AddUserRoom = {
  userId: number;
  roomId: number;
  typeRoom: string;
  password: string;
  login: string;
};

/*
 *
 * export type T_Participant = {
 *   userId: number;
 *   roomId: number;
 * };
 *
 *
 *  */
export type T_MsgHistory = {
  content: string;
  id: number;
  roomId: number;
  sender: string | undefined;
  userId: number;
};

export let objInfoMsg: T_Msg = {
  fromName: "",
  fromId: 0,
  roomId: 0,
  roomName: "",
  content: "",
};
