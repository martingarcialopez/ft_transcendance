import "../../styles/ChatTemplate.css";
import { T_Room, T_User } from "../../type/chat";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/index";
import { bindActionCreators } from "redux";
import { useState, useEffect } from "react";
import socketio from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
export const socket = socketio(ENDPOINT); //connection to the server nestJs

/**
 * this function get info on the one of item drawer has been click up
 * the info got, help to fill the T_msg object
 * these info cam from item
 *
 */
/* const ENDPOINT = "http://localhost:3000";
 * export const socket = socketio(ENDPOINT); //connection to the server nestJs */

function GetInfo(item: T_Room | T_User, state: any) {
  /* const dispatch = useDispatch();
					  /* const { ac_getIdRoomMsg } = bindActionCreators(actionCreators, dispatch); */

  state.ac_getIdRoomMsg(item.id);
  state.ac_getNameRoomMsg(item.name);
}

function findIndexItem(item: T_Room[] | T_User[], occurence: number): number {
  let tmp = 0;
  item.map((data, index: number) => {
    if (data.id === occurence) tmp = index;
  });
  return tmp;
}

/**
 * list of item in the left side
 * item can be either or groupe (room)
 */
function FriendDrawer(item: T_Room | T_User, index: number) {
  const dispatch = useDispatch();
  const state = bindActionCreators(actionCreators, dispatch);
  return (
    <div key={index}>
      <div
        className="friend-drawer friend-drawer--onhover"
        onClick={(e) => {
          GetInfo(item, state);
        }}
      >
        <img className="profile-image" src={item.avatar} alt="" />
        <div key={index} className="text">
          <h6>{item.name}</h6>
          <p className="text-muted">Hey, you're arrested!</p>
        </div>
        <span className="time text-muted small">13:21</span>
      </div>
      <hr />
    </div>
  );
}

/**
 *  this function represent the header with the avatar of  message recipients
 * item is user either a group
 */
function ItemSelected() {
  const { arrayRoom, message } = useSelector((state: RootState) => state);
  const index = findIndexItem(arrayRoom, message.roomId);
  let item: T_Room | T_User = arrayRoom[index];
  return (
    <>
      <div className="settings-tray">
        <div className="friend-drawer no-gutters friend-drawer--grey">
          <img className="profile-image" src={item.avatar} alt="" />
          <div className="text">
            <h6>{item.name}</h6>
            <p className="text-muted">
              Layin' down the law since like before Christ...
            </p>
          </div>
          <span className="settings-tray--right">
            <i className="material-icons">cached</i>
            <i className="material-icons">message</i>
            <i className="material-icons">menu</i>
          </span>
        </div>
      </div>
    </>
  );
}

/* function SendData() {
 *   const { message } = useSelector((state: RootState) => state);
 *
 * }
 *  */
function PrintMsg() {
  useEffect(() => {
    socket.on("MsgToClient: ", (receive: any) => {
      console.log("Msg received: ", receive);
    });
  }, [socket]);

  return (
    <>
      <div className="row no-gutters">
        <div className="col-md-3">
          <div className="chat-bubble chat-bubble--left">Hello dude!</div>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-md-3 offset-md-9">
          <div className="chat-bubble chat-bubble--right">Hello dude!</div>
        </div>
      </div>
    </>
  );
}

/**
 * handle the content to send
 * this function retrieve the input content, to set it into the object T_msg
 */
function InputMsg() {
  const dispatch = useDispatch();
  const state = bindActionCreators(actionCreators, dispatch);
  const [inputValue, setinputValue] = useState<string>("");
  const { message } = useSelector((state: RootState) => state);
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
          state.ac_getContentMsg(inputValue);
          setinputValue("");
          socket.emit(
            "createMessage",
            {
              fromUser: message.fromName,
              contentToSend: message.content,
              channelIdDst: message.roomId,
              channelName: message.roomName,
            },
            message.content
          );
        }}
      >
        send
      </i>
    </>
  );
}

export function ChatTemplate() {
  const { arrayRoom, message } = useSelector((state: RootState) => state);
  console.log("message:", message);

  return (
    <div>
      <div className="container">
        <div className="row no-gutters">
          <div className="col-md-4 border-right">
            <div className="settings-tray">
              <img
                className="profile-image"
                src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg"
                alt="Profile img"
              />
              <span className="settings-tray--right">
                <i className="material-icons">cached</i>
                <i className="material-icons">message</i>
                <i className="material-icons">menu</i>
              </span>
            </div>
            <div className="search-box">
              <div className="input-wrapper">
                <i className="material-icons">search</i>
                <input placeholder="Search here" type="text" />
              </div>
            </div>

            {arrayRoom.map(FriendDrawer)}
          </div>
          <div className="col-md-8">
            <ItemSelected />

            <div className="chat-panel">
              <PrintMsg />

              <div className="row">
                <div className="col-12">
                  <div className="chat-box-tray">
                    <i className="material-icons">sentiment_very_satisfied</i>

                    <InputMsg />
                    {/* <i className="material-icons">mic</i> */}
                    {/* <i className="material-icons">send</i> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
