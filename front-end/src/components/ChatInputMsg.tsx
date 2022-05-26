import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";
import { RootState } from "../redux/store";
import { useState } from "react";
import { E_CreateMessage } from "../components/Event";
//import { T_MsgHistory } from "../type/chat";
import { objInfoMsg } from "../type/chat";

/**
 * the current message came from the input, it will be store in array to be printed later
 * it is the message of current user
 */

/**
 * handle the content to send
 * this function retrieve the input content, to set it into the object T_msg
 */
export function InputMsg() {
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
          E_CreateMessage(
            userInfo.id,
            inputValue,
            objInfoMsg.roomId,
            userInfo.username
          );

          /* console.log("newMsg:", newMsg); */
        }}
      >
        send
      </i>
    </>
  );
}
