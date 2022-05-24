import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";
import { RootState } from "../redux/store";
import { useState } from "react";
import {
  E_CreateMessage,
  /* E_AllRoomInfos, */
} from "../components/Event";

type T_PropsMsg = {
  content: any[];
  setContent: Function;
  roomId: number;
};

function MsgToPrint(
  content: string,
  msgId: number,
  roomId: number,
  userId: number
) {
  return {
    content: content,
    id: msgId,
    roomId: roomId,
    userId: userId,
  };
}

/**
 * handle the content to send
 * this function retrieve the input content, to set it into the object T_msg
 */

export function InputMsg({ content, setContent, roomId }: T_PropsMsg) {
  const [inputValue, setinputValue] = useState<string>("");
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo }: UserState = userLogin;
  if (!userInfo) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="form-group">
        <textarea
          required
          value={inputValue}
          className="form-control"
          rows={1}
          id="comment"
          cols={40}
          onChange={(e) => setinputValue(e.target.value)}
        ></textarea>
      </div>
      <i
        className="material-icons btn-send-msg"
        onClick={() => {
          setinputValue("");
          E_CreateMessage(userInfo.id, inputValue, roomId, userInfo.username);
          let newMsg = MsgToPrint(inputValue, 0, roomId, userInfo.id);
          console.log("newMsg:", newMsg);
          setContent([...content, newMsg]);
        }}
      >
        send
      </i>
    </>
  );
}
