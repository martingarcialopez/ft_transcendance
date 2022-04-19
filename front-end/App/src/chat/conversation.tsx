import React from "react";
import { bindActionCreators } from "redux";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import * as actionCreators from "./redux/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import socketio from "socket.io-client";

/**
 *this file content all handler about send and received message
 *
 */
const ENDPOINT = "http://localhost:3000";
export const socket = socketio(ENDPOINT);

/**
 * print the title of chat and below the title all message are display
 */
function PrintChatMsg(contentMsg: string[]) {
  return (
    <>
      <h3>Chat</h3> <br></br>
      {contentMsg.map((item: string, index: number) => (
        <div key={index}> {JSON.stringify(item)} </div>
      ))}
    </>
  );
}

/**
 *to send message, it need to store the content , fill the object message
 *
 */
function sendMsg(MsgReceived: Function, state: any, content: string) {
  //to send message it must to selected a chanel first
  // if the none chanel was selected nothing will happened
  if (state.message.destChannel.name.length > 0) {
    /*
				 if the user selected a channel it can now send  message
			*/
    let newMsg = [...state.message.contentToSend, content];
    MsgReceived(newMsg);
    socket.emit("msgToServer", content);
  }
}

/**
 * take the message of the field text then stock into the store redux
 * add the new message in the
 * @returns chat text form
 */
export function TextField() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { ActionCreatorMsgReceived, ActionCreatorMsgToSend } =
    bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state: RootState) => state);

  /* console.log(state); */
  socket.on("msgToClient", (receive: any) => {
    let newArray = [...state.message.contentReceived, receive];
    ActionCreatorMsgReceived(newArray); //add content of message in area
  });

  return (
    <>
      {PrintChatMsg(state.message.contentReceived)}
      {console.log("message conversation:", state.message)}
      <form
        className="field-chat"
        onSubmit={handleSubmit((data) => {
          sendMsg(ActionCreatorMsgToSend, state, data.name);
        })}
      >
        <textarea
          placeholder="Type message.."
          required
          {...register("name")}
          autoComplete="on"
        ></textarea>
        <button className="send-msg">
          <BsFillArrowUpCircleFill
            className="send-msg"
            size={60}
            color="Aquamarine"
          />{" "}
        </button>
      </form>
    </>
  );
}
