import { useEffect, useRef } from "react";

interface I_Messages {
  roomId: number;
  messages: I_Message[];
}

interface I_Message {
  userId: number;
  roomId: number;
  content: string;
  createdDate: string;
  id: number;
}

export function MessagePanel(props: any) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  /*
   *
   * 	const scrollToBottom = () => {
   * 		messagesEndRef.current?.scrollIntoView({
   * 			block: "end",
   * 			inline: "nearest",
   * 			behavior: "smooth",
   * 		});
   * 	};
   *
   *  */

  // useEffect(() => {
  // 	scrollToBottom();
  // }, [props.messages]);

  useEffect(() => {
    const getMessages_listener = (newMessages: I_Messages) => {
      const messageRoomId = newMessages.roomId;
      let newVarValues = new Map(props.messages);
      newVarValues.set(messageRoomId, newMessages.messages);
      if (newVarValues !== props.messages) {
        props.setMessages(newVarValues);
      }
    };
    if (
      props.appSocket._callbacks !== undefined &&
      props.appSocket._callbacks["getMessages_listener"] === undefined
    ) {
      props.appSocket.on("B_getMessages", getMessages_listener);
    }
    return () => {
      props.appSocket.removeAllListeners("B_getMessages");
    };
  });

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
          <div id="pre-messages" key={i}>
            <div id="messages">
              <img src={currentUser.avatar} alt="" />

              <div id="column-message">
                <div id="name-date-message">
                  <div>{currentUser.username}</div>
                  <div>{message.createdDate}</div>
                </div>
                <div
                  id="message-send"
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
                {/* <div>{message.content}</div> */}
                {/* </div> */}
              </div>
            </div>
            <div id="risco">
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
        <div>{currentRoom.name}</div>
      </div>

      <div id="risco">
        <hr />
        <div id="room-greating"> Lets the chat begin </div>
        <hr />
      </div>

      {Html_messages}
    </div>
  );
}
