export type T_Room = {
  name: string;
  id: number;
  typeRoom: string;
  password: string;
  owner: number[];
  /* members: number[]; */
  participants: [];
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

export type T_AddUserRoom = {
  userId: number;
  roomId: number;
  typeRoom: string;
  password: string;
  login: string;
};

export type T_Participant = {
  userId: number;
  roomId: number;
};
