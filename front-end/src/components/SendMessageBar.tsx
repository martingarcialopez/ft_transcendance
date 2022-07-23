import { useEffect } from "react";

import emote from "../styles/assets/emote.svg";
import gift from "../styles/assets/gift.svg";
import gif from "../styles/assets/gif.svg";
import plus from "../styles/assets/plus.svg";

interface I_Message {
  userId: number;
  roomId: number;
  content: string;
  createdDate: string;
  id: number;
}

export function SendMessageBar(props: any) {
  useEffect(() => {
    const createMessage_listener = (newMessageInfos: I_Message) => {
      if (props.messages !== undefined) {
        let intendedRoomMessages = props.messages.get(newMessageInfos.roomId);
        const newMessage: any = {
          userId: newMessageInfos.userId,
          content: newMessageInfos.content,
          createdDate: newMessageInfos.createdDate,
        };
        if (intendedRoomMessages !== undefined) {
          intendedRoomMessages.push(newMessage);
        } else {
          intendedRoomMessages = [newMessage];
        }
        let newVarValues = new Map(props.messages);
        newVarValues.set(newMessageInfos.roomId, intendedRoomMessages);
        props.setMessages(newVarValues);
      }
    };
    if (
      props.appSocket._callbacks !== undefined &&
      props.appSocket._callbacks["createMessage_listener"] === undefined
    ) {
      props.appSocket.on("B_createMessage", createMessage_listener);
    }
    return () => {
      props.appSocket.removeAllListeners("B_createMessage");
    };
  });

  if (props.messageBarValues === undefined || props.currRoomId === -1) {
    return <div></div>;
  }
  const onChange_setMessageBarValue = (value: string) => {
    if (props.messageBarValues !== undefined) {
      let newVarValues = new Map(props.messageBarValues);
      newVarValues.set(props.currRoomId, value);
      props.setMessageBarValue(newVarValues);
    }
  };
  const onSubmit_messageBar = (e: any) => {
    e.preventDefault();
    if (props.messageBarValues === undefined) {
      return;
    }

    var tmp_content = props.messageBarValues.get(props.currRoomId);
    if (tmp_content !== undefined && tmp_content.toUpperCase() === "MIAO")
      tmp_content = "😻";
    let messageToCreate = {
      roomId: props.currRoomId,
      content: tmp_content,
    };

    props.appSocket.emit(
      "F_createMessage",
      messageToCreate,
      (isOk: boolean) => {
        if (isOk) {
          onChange_setMessageBarValue("");
        }
      }
    );
  };

  const currentRoom = props.roomsList.filter(
    (obj: any) => obj.id === props.currRoomId
  )[0];
  if (currentRoom === undefined) {
    return <div></div>;
  }

  let placeholder_val = "Click here to start messaging";
  let isLocked = false;
  if (currentRoom !== undefined && currentRoom.participants !== undefined) {
    const this_participant = currentRoom.participants.filter(
      (obj: any) => obj.userId === props.connectedUser.userId
    )[0];
    isLocked = this_participant.isMute;
    if (isLocked === true) {
      placeholder_val = "⛔ You are muted ⛔";
    }
  }

  const currentValueBis = props.messageBarValues.get(props.currRoomId);
  return (
    <div id="send-message" key={props.currRoomId}>
      <img src={plus} alt="" className="to-Hidden" />
      <form action="#" onSubmit={onSubmit_messageBar}>
        <input
          type="text"
          disabled={isLocked}
          value={currentValueBis}
          placeholder={placeholder_val}
			required
			maxLength={100}
          onChange={(e) => {
            onChange_setMessageBarValue(e.target.value);
          }}
        />
      </form>
      <img src={gift} alt="" className="to-Hidden" />{" "}
      <img src={gif} alt="" className="to-Hidden" />
      <img src={emote} alt="" className="to-Hidden" />
    </div>
  );
}
