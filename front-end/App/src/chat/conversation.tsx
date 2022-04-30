import { bindActionCreators } from "redux";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import * as actionCreators from "./redux/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import socketio from "socket.io-client";
import { TitlePage } from "./utilsComponent";
import "./style/conversation.css";
import { useState, useEffect } from "react";
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
function sendM(
  InsertContent: Function,
  AddNewMsg: Function,
  state: any,
  content: string
) {
  if (state.message.channelIdDst > 0) {
    /* let objMsg: t_msgToSend = state.message; */

    InsertContent(content);
    let objMsg: t_msgToSend = JSON.parse(JSON.stringify(state.message));
    /* objMsg.contentToSend = content; */
    /* objMsg.contentToSend =  */
    console.log("objMsg send to server :", objMsg);
    AddNewMsg(objMsg);
    socket.emit("createMessage", objMsg, content);
    socket.on("MsgToClient: ", (receive: any) => {
      console.log("Msg receive: ", receive);
    });
  }
}

function sendMsg(MsgToSend: Function, state: any, content: string) {
  /*to send message it must to selected a chanel first
		  if the none chanel was selected nothing will happened
	   */

  if (state.message.channelIdDst > 0) {
    /*
					if the user selected a channel it can now send  message
					add the new contnent into the array
			*/
    MsgToSend(content);
    //if uncomment the line bellow it going to broacast content
    /* socket.emit("msgToServer", content); */
    let objMsg = state.message;

    /* let channelName: string = state.message.destChannel.name; */

    objMsg.contentToSend = content;

    console.log("obj send to server :", objMsg);
    socket.emit("createMessage", objMsg, objMsg.channelName);
  }

  /* socket.on("MsgToClient: ", (receive: any) => {
   *   console.log("MsgToClient: ", receive);
   * }); */
}

function PrintReceivedMsg() {
  const { arrayMessage } = useSelector((state: RootState) => state);
  console.log("arrayMessage:", arrayMessage);
  return (
    <>
      {arrayMessage.map((item) => {
        <h3>{item.contentToSend}</h3>;
      })}
    </>
  );
}
function initStateMsg(): t_msgToSend {
  return {
    fromUser: "unknow",
    contentToSend: "",
    channelIdDst: -1,
    channelName: "",
  };
}

/**
 * take the message of the field text then stock into channel, proriety message
 * add the new message in the...
 * @returns chat text form
 */
export function TextField() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { ActionCreatorMsgContent } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const state = useSelector((state: RootState) => state);
  const [inputValue, setinputValue] = useState((): string => {
    return "";
  });
  /* console.log("state.arrayMsg:", state.arrayMessage[0].fromUser); */
  const [msg, setMsg] = useState(() => [""]);

  useEffect(() => {
    socket.on("MsgToClient: ", (receive: string) => {
      console.log("MsgToClient: ", receive);
      console.log("JSON: ", JSON.parse(JSON.stringify(state.message)));
      /* ActionCreatorAddNewMsg(); */
      /* console.log("arrayMessage:", JSON.parse(JSON.stringify(state.message))); */

      setMsg((msg) => [...msg, receive]);
    });
  }, [socket]);

  return (
    <>
      <TitlePage />

      {msg.map((item, index: number) => (
        <div key={index}>{item}</div>
      ))}
      <form
        className="field-chat"
        onSubmit={handleSubmit((data) => {
          sendMsg(ActionCreatorMsgContent, state, data.name);
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
