import socketio from "socket.io-client";
import { URL_test } from "../constants/url";
import { T_AddUserRoom, T_Room } from "../type/chat";
import { T_MsgHistory, objInfoMsg } from "../type/chat";

const ENDPOINT = URL_test;

export const socket = socketio(ENDPOINT); //connection to the server nestJs

export function E_CreateParticipant(userName: number, roomId: number) {
  socket.emit("createParticipant", {
    userName: userName,
    roomId: roomId,
  });
  socket.on("participantId", (receive: { id: number }) => {
  });
}

export function E_GetMessage(userId: number, roomId: number) {
  //console.log("event getMessage:\nuserId: ", userId, "\nroom id:", roomId);
  socket.emit("getMessage", {
    userId: userId,
    roomId: roomId,
  });
}

export function E_MsgToClient(setMsg: Function) {
  socket.on("msgToClient", (received: T_MsgHistory[]) => {
    //    console.log("reponse msgToclient  : ", received);
    setMsg(received);
  });
}

export function E_CreateMessage(
  userId: number,
  contentToSend: string,
  channelIdDst: number,
  sender: string | undefined
) {
  if (typeof sender === "undefined") sender = "wsh";
  /* console.log("event 'createMessage':\nUserId:", userId);
   * console.log("content:", contentToSend);
   * console.log("roomId:", channelIdDst); */
  socket.emit("createMessage", {
    userId: userId,
    contentToSend: contentToSend,
    channelIdDst: channelIdDst,
    sender: typeof sender === "undefined" ? "wsh" : sender,
  });
}

/**
 * to get id, there for need to send the  room at server so that it give back the id
 */

export function E_CreateRoom(
  newRoom: T_Room,
  creatorId: number,
  updateRoomArray: Function,
  setMsgError: Function
) {
  socket.emit("createRoom", {
    name: newRoom.name,
    creatorId: creatorId,
    typeRoom: newRoom.typeRoom,
    password: newRoom.password,
  });
  socket.on("idRoom", (receive: { id: number }) => {
    newRoom.id = receive.id;
    /* newRoom.owner.push(creatorId);
     * updateRoomArray(newRoom); */
    E_AllRoomInfos(updateRoomArray);
    setMsgError("none");
  });
  socket.on("exception", (receive: { status: string; message: string }) => {
    setMsgError("inline");
  });
}

export function E_UpdatePwd(userId: number, roomId: number, pwd: string) {
  socket.emit("updateRoomPw", {
    userId: userId,
    roomId: roomId,
    password: pwd,
  });
}

export function E_JoinRoom(info: T_AddUserRoom) {
  socket.emit("JoinRoom", info);
  socket.on("hasJoined", (receive: { state: boolean }) => {
  });
}

export function E_HasJoined(setMsgError: Function) {
  socket.on("hasJoined", (receive: { state: boolean }) => {
    if (receive.state === true) setMsgError("inline");
    else setMsgError("none");
  });
}

export function E_ManageAdmin(
  userId: number,
  roomId: number,
  login: string,
  state: boolean
) {
  socket.emit("manageAdmin", {
    userId: userId,
    roomId: roomId,
    login: login,
    toAdd: state,
  });
}

export function E_DeleteRoomPw(userId: number, roomId: number) {
  socket.emit("deleteRoomPw", {
    userId: userId,
    roomId: roomId,
  });
  socket.on("UpdatePwRes", (receive: { state: boolean }) => {
  });
}

export function E_LeaveRoom(userId: number, roomId: number) {
  socket.emit("leaveRoom", {
    userId: userId,
    roomId: roomId,
  });
  /* socket.on("UpdatePwRes", (receive: { state: boolean }) => {
   *   console.log("reponse UpdatePwRes : ", receive);
   * }); */
}

export function E_AllRoomInfos(updateArrayRoom: Function) {
  socket.emit("allRoomInfos");
  socket.on("allRoomInfosRes", (receive: T_Room[]) => {
    receive.forEach((item: T_Room) => {
      item.avatar =
        "https://www.pngkit.com/png/detail/131-1318731_group-of-people-in-a-formation-free-icon.png";
      /* "https://avatars.dicebear.com/api/adventurer/" + item.name + ".svg"; */
    });
    /* console.log("tab Room:", receive); */
    updateArrayRoom(receive);
  });
}

export function E_MsgtoChat(
  msgOtherUsers: T_MsgHistory[],
  setMsgOtherUsers: Function
) {
  socket.on("MsgtoChat", (received: T_MsgHistory) => {
    if (received.roomId === objInfoMsg.roomId) {
      setMsgOtherUsers([...msgOtherUsers, received]);
    }
  });
}

export function E_BanUser(
  userId: number,
  userIdToMute: string,
  roomId: number
) {
  socket.emit("banUser", {
    userId: userId,
    userIdToMute: userIdToMute,
    roomId: roomId,
    time: 0,
  });
}

export function E_MuteUser(
  userId: number,
  userIdToMute: string,
  roomId: number,
  time: string
) {
  socket.emit("muteUser", {
    userId: userId,
    userIdToMute: userIdToMute,
    roomId: roomId,
    time: time,
  });
}

export function E_createCustomGame(
  userId: number,
  difficulty: string,
  maxScore: string
) {
  socket.emit("createCustomGame", {
    userId: userId,
    difficulty: difficulty,
    maxScore: maxScore,
  });
}

export function E_printInvitation(userId: number, roomId: string) {
  socket.on(
    "printInvitation",
    (receive: { userName: string; roomId: number }) => {
      console.log("printIvitation: ", receive);
    }
  );
}
