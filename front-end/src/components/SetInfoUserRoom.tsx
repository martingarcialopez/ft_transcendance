import { T_AddUserRoom } from "../type/chat";

export function SetInfoUserRoom(
  userId: number,
  roomId: number,
  typeRoom: string,
  password: string,
  login: string
) {
  let info: T_AddUserRoom = {
    userId: userId,
    roomId: roomId,
    typeRoom: typeRoom,
    password: password,
    login: login,
  };
  return info;
}
