import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";
import { RootState } from "../redux/store";
import { useState } from "react";
import { E_CreateMessage } from "../components/Event";
import { T_MsgHistory } from "../type/chat";

type T_PropsMsg = {
  currentMsg: T_MsgHistory[]; //it is @currentMsg from chat
  setCurrentMsg: Function;
  roomId: number;
};

/**
 * the current message came from the input, it will be store in array to be printed later
 * it is the message of current user
 */
function MsgFromInput(
  content: string,
  id: number,
  roomId: number,
  userId: number,
  sender: string | undefined
): T_MsgHistory {
  return {
    content: content,
    id: id,
    roomId: roomId,
    userId: userId,
    sender: sender,
  };
}

/**
 * handle the content to send
 * this function retrieve the input content, to set it into the object T_msg
 */
export function InputMsg({ currentMsg, setCurrentMsg, roomId }: T_PropsMsg) {
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
          let newMsg = MsgFromInput(
            inputValue,
            0,
            roomId,
            userInfo.id,
            userInfo.username
          );
          /* console.log("newMsg:", newMsg); */
          setCurrentMsg([...currentMsg, newMsg]);
        }}
      >
        send
      </i>
    </>
  );
}
