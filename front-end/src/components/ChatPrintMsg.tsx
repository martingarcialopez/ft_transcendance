import { useState } from "react";
import { E_MsgToClient } from "../components/Event";

type T_Props = {
  content: string;
  id: number;
  roomId: number;
  userId: number;
};

type Props_ArrayMsg = {
  contentMsg: any[];
};

function Print({ userId, content }: T_Props, index: number) {
  return (
    <div key={index}>
      <ul>
        userID:{userId}
        <li>{content}</li>
      </ul>
    </div>
  );
}

export function PrintMsg({ contentMsg }: Props_ArrayMsg) {
  const [msgHistory, SetMsg] = useState<any>([]);

  E_MsgToClient(SetMsg);
  if (msgHistory.length === 0) return <></>;
  return (
    <>
      {msgHistory.map(Print)}
      {contentMsg.map(Print)}
    </>
  );
}
