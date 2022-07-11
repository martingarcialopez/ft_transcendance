import { useState, useEffect, useRef } from "react";

export function MessagePanel(props: any) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  if (
    props.currRoomId === -1 ||
    props.roomsList === undefined ||
    props.roomsList.length === 0
  ) {
    return <div></div>;
  }
  const currentRoom = props.roomsList.filter(
    (obj: any) => obj.id === props.currRoomId
  )[0];

  if (currentRoom === undefined) {
    return <div></div>;
  }

  let Html_messages = <div></div>;
  if (
    props.messages !== undefined &&
    props.messages.length !== 0 &&
    props.messages.get(props.currRoomId) !== undefined
  ) {
    const currMessages = props.messages.get(props.currRoomId);
    if (currMessages.length > 0) {
      Html_messages = currMessages.map((message: any, i: any) => {
        let currentUser = currentRoom.participants.filter(
          (obj: any) => obj.userId === message.userId
        )[0];
        if (currentUser === undefined) {
          return <div key={i}></div>;
        }
        return (
          <div key={i}>
            <div id="messages">
              <img src={currentUser.avatar} alt="" />

              <div id="column-message">
                <div id="name-date-message">
                  <a href="user-username">{currentUser.username}</a>
                  <a href="message-date">{message.createdDate}</a>
                </div>
                <div id="message-send">
                  <a href="message-content">{message.content}</a>
                </div>
              </div>
            </div>
            <div id="risco">
              <hr />
              <a href="-------------------"> ------------------- </a>
              <hr />
            </div>
            <div ref={messagesEndRef} />
          </div>
        );
      });
    }
  }

  return (
    <div id="mao-messages-panel">
      <div id="profile">
        <img src={currentRoom.image} alt="" />
        <a href="room-name" >{currentRoom.name}</a>
      </div>

      <div id="risco">
        <hr />
        <a href="welcome-message"> Lets the chat begin </a>
        <hr />
      </div>

      {Html_messages}
    </div>
  );
}
