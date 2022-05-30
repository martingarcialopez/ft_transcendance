import { useState } from "react";
import { E_MsgToClient, E_MsgtoChat } from "../components/Event";
//import { T_Msg } from "../type/chat";
import { T_MsgHistory } from "../type/chat";

function Print({ userId, content, sender }: T_MsgHistory, index: number) {
  return (
    <div key={index} className="chat-bubble chat-bubble--left">
      <div className="userName">
        userID:{userId} name:{sender}
      </div>
      <p>{content}</p>
    </div>
  );
}

/**
 *
 */
/* function FilterRoom(room: T_Msg | any, roomId: number) {
 *   return room.filter((item: any) => item.roomId === roomId);
 * } */

export function PrintMsg() {
  const [msgHistory, setMsgHistory] = useState<any>([]);

  /* const [msgOtherUsers, setMsgOtherUsers] = useState<T_MsgHistory[]>([]); */
  E_MsgToClient(setMsgHistory);
  /* const currentMsgFilter = FilterRoom(currentMsg, infoMsg.roomId); */

  /* E_MsgtoChat(msgOtherUsers, setMsgOtherUsers, infoMsg); */
  E_MsgtoChat(msgHistory, setMsgHistory);
  /* {msgOtherUsers.map(Print)} */
  /* {currentMsgFilter.map(Print)} */

  return <>{msgHistory.map(Print)}</>;
}
