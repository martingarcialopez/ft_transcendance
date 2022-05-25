import { useState } from "react";
import { E_MsgToClient } from "../components/Event";

import { T_MsgHistory } from "../type/chat";

type Props_ArrayMsg = {
  contentMsg: any[];
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

export function PrintMsg({ contentMsg }: Props_ArrayMsg) {
  const [msgHistory, SetMsg] = useState<any>([]);

  E_MsgToClient(SetMsg);
  //if (msgHistory.length === 0) return <></>;
  return (
    <>
      {msgHistory.map(Print)}
      {contentMsg.map(Print)}
    </>
  );
}
