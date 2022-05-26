import { useState } from "react";
import { E_MsgToClient, E_MsgtoChat } from "../components/Event";
import { T_Msg } from "../type/chat";
import { T_MsgHistory } from "../type/chat";

type Props_ArrayMsg = {
  currentMsg: T_MsgHistory[];
  infoMsg: T_Msg;
};

function Print({ userId, content, sender }: T_MsgHistory, index: number) {
  return (
    <div key={index}>
      <ul>
        userID:{userId} name:{sender}
        <li>{content}</li>
      </ul>
    </div>
  );
}

/**
 *
 */
/* function FilterRoom(room: T_Msg | any, roomId: number) {
 *   return room.filter((item: any) => item.roomId === roomId);
 * } */

export function PrintMsg({ currentMsg, infoMsg }: Props_ArrayMsg) {
  const [msgHistory, setMsgHistory] = useState<any>([]);
  /* const [msgOtherUsers, setMsgOtherUsers] = useState<T_MsgHistory[]>([]); */
  E_MsgToClient(setMsgHistory);

  /* const currentMsgFilter = FilterRoom(currentMsg, infoMsg.roomId); */

  /* E_MsgtoChat(msgOtherUsers, setMsgOtherUsers, infoMsg); */
  E_MsgtoChat(msgHistory, setMsgHistory, infoMsg);
  /* {msgOtherUsers.map(Print)} */
  /* {currentMsgFilter.map(Print)} */
  return <>{msgHistory.map(Print)}</>;
}
