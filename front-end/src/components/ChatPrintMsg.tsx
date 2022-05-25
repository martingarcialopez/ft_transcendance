import { useState } from "react";
import { E_MsgToClient } from "../components/Event";
import { T_Msg } from "../type/chat";

import { T_MsgHistory } from "../type/chat";

type Props_ArrayMsg = {
  currentMsg: any[];
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

function FilterRoom(room: T_Msg | any, roomId: number) {
  return room.filter((item: any) => item.roomId === roomId);
}

export function PrintMsg({ currentMsg, infoMsg }: Props_ArrayMsg) {
  const [msgHistory, SetMsg] = useState<any>([]);
  E_MsgToClient(SetMsg);
  const msgHistoryFilter = FilterRoom(msgHistory, infoMsg.roomId);
  const currentMsgFilter = FilterRoom(currentMsg, infoMsg.roomId);
  /* console.log("roomId:", infoMsg.roomId);
   * console.log("msgHistoryFilter:", msgHistoryFilter);
   * console.log("currentMsgFilter:", currentMsgFilter); */
  return (
    <>
      {/* {msgHistory.map(Print)} */}
      {msgHistoryFilter.map(Print)}
      {currentMsgFilter.map(Print)}
    </>
  );
}
