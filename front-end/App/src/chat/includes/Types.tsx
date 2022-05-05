export type T_Room = {
  name: string;
  id: number;
  typeRoom: string;
  password: string;
  owner: number[];
  members: number[];
  avatar: string;
};

export type T_Msg = {
  fromName: string;
  fromId: number;
  roomId: number;
  roomName: string;
  content: string;
};

export type T_User = {
  name: string;
  id: number;
  avatar: string;
};

export type T_Action = {
  type: string;
  payload: any;
};