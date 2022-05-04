import "../styles/index.css";
/* import { rooms } from "../index"; */
import { T_Room, T_User } from "../../type/chat";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/index";
import { bindActionCreators } from "redux";

import { useForm } from "react-hook-form";

/**
 * this function get info on the one of item drawer has been click up
 * the info got, help to fill the T_msg object
 * these info cam from item
 *
 */

function GetInfo(item: T_Room | T_User, state: any) {
  /* const dispatch = useDispatch();
	/* const { ac_getIdRoomMsg } = bindActionCreators(actionCreators, dispatch); */

  state.ac_getIdRoomMsg(item.id);
  state.ac_getNameRoomMsg(item.name);
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
  let item: T_Room = arrayRoom[message.roomId];

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

function PrintMsg() {
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
 * this function retrieve the input content to set it into the object T_msg
 */
function InputMsg() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const state = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <div className="form-group">
        <textarea
          className="form-control"
          rows={1}
          id="comment"
          {...register("contentMsg")}
          cols={40}
        ></textarea>
      </div>
      <i
        className="material-icons btn-send-msg"
        onClick={handleSubmit((data) => {
          console.log("value : ", data.contentMsg);
          state.ac_getContentMsg(data.contentMsg);
        })}
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

                    {/* <input
                      type="text"
                      placeholder="Type your message here..."
                    /> */}
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
