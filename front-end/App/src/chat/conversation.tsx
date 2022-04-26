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
 *to send message, it need to store the content , fill the object message
 *  all @content is store into a array
 *@content is the text in the textaera
 *@state is the store of redux
 *MsgReceived : is the ActionCreator for the message
 */
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
}

/**
 * take the message of the field text then stock into the store redux
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
  return (
    <>
      <TitlePage />
      {/* <PrintReceivedMsg /> */}
      {/* {console.log("message :", state.message)} */}
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
