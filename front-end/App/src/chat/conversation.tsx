import { bindActionCreators } from "redux";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import * as actionCreators from "./redux/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import socketio from "socket.io-client";
import { TitlePage } from "./utilsComponent";
import "./style/conversation.css";
import { useState } from "react";
import { t_msgToSend } from "./type";

/**
 * this the page you see when you chat with someone
 *this file content all handler about send and received message
 *
 */

const ENDPOINT = "http://localhost:3000";

export const socket = socketio(ENDPOINT); //connection to the server nestJs

/**
 * liste event and print the message received
 *
 */

/**
 * to send message, it need to store the content , fill the object message
 * all @content is store into a array
 * @content is the text in the textaera
 * @state is the store of redux
 * MsgReceived : is the ActionCreator for the message
 */
function sendMsg(
  InsertContent: Function,
  AddNewMsg: Function,
  state: any,
  content: string
) {
  if (state.message.channelIdDst > 0) {
    let objMsg: t_msgToSend = state.message;
    InsertContent(content);
    objMsg.contentToSend = content;
    console.log("obj send to server :", objMsg);
    socket.emit("createMessage", objMsg, objMsg.channelName);
    socket.on("MsgToClient: ", (receive: any) => {
      console.log("Msg receive: ", receive);
      AddNewMsg(objMsg);
    });
  }
}

function PrintReceivedMsg() {
  const { arrayMessage } = useSelector((state: RootState) => state);
  /* console.log("arrayMessage:", arrayMessage); */
  return (
    <div>
      {arrayMessage.map((item) => {
        <ul>
          item.channelName
          <li>item. contentToSend</li>
        </ul>;
      })}
    </div>
  );
}

/**
 * take the message of the field text then stock into channel, proriety message
 * add the new message in the...
 * @returns chat text form
 */
export function TextField() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { ActionCreatorMsgContent, ActionCreatorAddNewMsg } =
    bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: RootState) => state);
  const [inputValue, setinputValue] = useState((): string => {
    return "";
  });
  /* console.log("state.arrayMsg:", state.arrayMessage); */
  return (
    <>
      <TitlePage />
      <PrintReceivedMsg />
      <form
        className="field-chat"
        onSubmit={handleSubmit((data) => {
          sendMsg(
            ActionCreatorMsgContent,
            ActionCreatorAddNewMsg,
            state,
            data.name
          );
          setinputValue(""); //remove input value after submit text msg
        })}
      >
        <textarea
          placeholder="Type message.."
          required
          {...register("name")}
          autoComplete="on"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        ></textarea>
        <button className="btn-send-msg">
          <BsFillArrowUpCircleFill />{" "}
        </button>
      </form>
    </>
  );
}
