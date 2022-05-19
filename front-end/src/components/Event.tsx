import socketio from "socket.io-client";
import { T_Room } from "../type/chat";

const ENDPOINT = 'http://localhost:3000';
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

/*
 * function E_GetMessage(userId: number, roomId: number) {
 *   socket.emit("getMessage", {
 *     userId: userId,
 *     roomId: roomId,
 *   });
 *
 *   socket.on(
 *     "msgToClient",
 *     (received: { blockList: number[]; message_history: any }) => {
 *       console.log("reponse msgToclient  : ", received);
 *     }
 *   );
 * }
 *
 * function E_CreateMessage(userId: number, roomId: number, content: string) {
 *   socket.emit("createMessage", {
 *     userId: userId,
 *     roomId: roomId,
 *     content: content,
 *   });
 * }
 *  */
/**
 * to get id, there for need to send the  room at server so that it give back the id
 */

export function E_CreateRoom(newRoom: T_Room, creatorId: number) {
  socket.emit("createRoom", {
    name: newRoom.name,
    creatorId: creatorId,
    typeRoom: newRoom.typeRoom,
    password: newRoom.password,
  });
  /* socket.on("idRoom", (receive: { id: number }) => {
   *   console.log("reponse creation Room : ", receive);
   *   newRoom.id = receive.id;
   * }); */
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

export function E_JoinRoom(userId: number, roomId: number, pwd: string) {
  socket.emit("JoinRoom", {
    userId: userId,
    roomId: roomId,
    password: pwd,
  });
  console.log("user :", userId, " roomId:", roomId, " password:", pwd);
  socket.on("hasJoined", (receive: { state: boolean }) => {
    console.log("reponse hasJoined Room : ", receive);
  });
}

export function E_ManageAdmin(userId: number, roomId: number, state: boolean) {
  socket.emit("manageAdmin", {
    userId: userId,
    roomId: roomId,
    toAdd: state,
  });
  socket.on("UpdatePwRes", (receive: { state: boolean }) => {
    console.log("reponse manageAdmin : ", receive);
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
