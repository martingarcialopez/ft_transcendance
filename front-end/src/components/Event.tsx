import socketio from "socket.io-client";
import { URL_test } from "../constants/url";
import { T_AddUserRoom, T_Room } from "../type/chat";
import { T_MsgHistory } from "../type/chat";

const ENDPOINT = URL_test;

export const socket = socketio(ENDPOINT); //connection to the server nestJs

export function E_CreateParticipant(userName: number, roomId: number) {
  console.log("send:\nuserName: ", userName, "\nroom id:", roomId);
  socket.emit("createParticipant", {
    userName: userName,
    roomId: roomId,
  });
  socket.on("participantId", (receive: { id: number }) => {
    console.log("reponse createParticipant : ", receive);
  });
}

export function E_GetMessage(userId: number, roomId: number) {
  console.log("event getMessage:\nuserId: ", userId, "\nroom id:", roomId);
  socket.emit("getMessage", {
    userId: userId,
    roomId: roomId,
  });
}

export function E_MsgToClient(setMsg: Function) {
  socket.on("msgToClient", (received: T_MsgHistory[]) => {
    /* console.log("reponse msgToclient  : ", received); */
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
  console.log("event 'createMessage':\nUserId:", userId);
  console.log("content:", contentToSend);
  console.log("roomId:", channelIdDst);
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
  updateRoomArray: Function
) {
  socket.emit("createRoom", {
    name: newRoom.name,
    creatorId: creatorId,
    typeRoom: newRoom.typeRoom,
    password: newRoom.password,
  });
  socket.on("idRoom", (receive: { id: number }) => {
    console.log("reponse creationRoom 'idRoom': ", receive);
    newRoom.id = receive.id;
    updateRoomArray(newRoom);
  });
  socket.on("exception", (receive: { status: string; message: string }) => {
    console.log("reponse creation 'exception': ", receive);
  });
}

export function E_UpdatePwd(userId: number, roomId: number, pwd: string) {
  socket.emit("updateRoomPw", {
    userId: userId,
    roomId: roomId,
    password: pwd,
  });
  console.log("send event : updatePwd");
}

export function E_SendEvent(userId: number, roomId: number, eventName: string) {
  socket.emit(eventName, {
    userId: userId,
    roomId: roomId,
  });
  console.log("send event : ", eventName);
}

/* export function E_JoinRoom(userId: number, roomId: number, pwd: string) { */
export function E_JoinRoom(info: T_AddUserRoom) {
  socket.emit("JoinRoom", info);
  console.log("Event 'JoinRoom' :", info);
  socket.on("hasJoined", (receive: { state: boolean }) => {
    console.log("reponse hasJoined Room : ", receive);
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
    console.log("reponse UpdatePwRes : ", receive);
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

export function E_BlockUser(userId: number, blockUserId: number) {
  socket.emit("blockUser", {
    userId: userId,
    blockUserId: blockUserId,
  });
  console.log("send event blockUserId: ", blockUserId);
}

export function E_AllRoomInfos(updateArrayRoom: Function) {
  socket.emit("allRoomInfos");
  socket.on("allRoomInfosRes", (receive: T_Room[]) => {
    receive.forEach((item: T_Room) => {
      item.avatar =
        "https://avatars.dicebear.com/api/adventurer/" + item.name + ".svg";
    });
    /* console.log("tab Room:", receive); */
    updateArrayRoom(receive);
  });
}

/*
 * export function E_(updateArrayRoom: Function) {
 *   socket.emit( "createMessage",
 *             {
 * 				  fromUser: message.fromName,
 * 				  contentToSend: message.content,
 * 				  roomIdDst: message.roomId,
 * 			  },
 * 			  message.content
 * 		  );
 * } */
