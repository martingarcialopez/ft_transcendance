import "../styles/ChatTemplate.css";
import { T_Room, T_User } from "../type/chat";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/index";
import { bindActionCreators } from "redux";
import { useState } from "react";

import {
  E_CreateMessage,
  E_GetMessage,
  E_MsgToClient,
  /* E_AllRoomInfos, */
} from "../components/Event";

import { UserState } from "../redux/reducers/userReducers";

function findIndexItem(item: T_Room[] | T_User[], occurence: number): number {
  let tmp = 0;
  item.forEach((data, index: number) => {
    if (data.id === occurence) tmp = index;
  });
  return tmp;
}

/**
 * list of item in the left side
 * item can be either user or room
 * this function  manage the click on the left bar
 * get id of room cliked and the userId
 */
function FriendDrawer(item: T_Room | T_User, index: number) {
  const dispatch = useDispatch();
  const states = bindActionCreators(actionCreators, dispatch);

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo }: UserState = userLogin;
  if (!userInfo) {
    return <h1>Loading...</h1>;
  }

  return (
    <div key={index}>
      <div
        className="friend-drawer friend-drawer--onhover"
        onClick={(e) => {
          E_GetMessage(userInfo.id, item.id);
          states.ac_getIdRoomMsg(item.id); //room clicked
          states.ac_getUserId(userInfo.id); //userId
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

/*
 *
 * type T_Props = {
 *   msg: any;
 * };
 *
 *
 *  */
/*
 *
 * function BubbleMsg({ msg }: T_Props) {
 *   return (
 *     <>
 *       <div className="row no-gutters">
 *         <div className="col-md-3">
 *           <div className="chat-bubble chat-bubble--left">
 *             {" "}
 *             JSON.stringify(msg)
 *           </div>
 *         </div>
 *       </div>
 *     </>
 *   );
 * }
 *
 *
 *  */
/*
 *
 * type T_MsgHistory = {
 *   content: string;
 *   id: number;
 *   roomId: number;
 *   userId: number;
 * };
 *
 *  */
/*
 * function InitMgHistory(): T_MsgHistory {
 *   return { content: "", id: 0, roomId: 0, userId: 0 };
 * }
 *  */
function PrintMsg() {
  const [msg, SetMsg] = useState<any>([]);

  E_MsgToClient(SetMsg);
  console.log("msg", msg);
  return <div>message_history:{JSON.stringify(msg)}</div>;
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
          state.ac_getContentMsg(inputValue);
          setinputValue("");
          console.log("message:", message);
          E_CreateMessage(userInfo.id, inputValue, message.roomId);
        }}
      >
        send
      </i>
    </>
  );
}
/**
 * inputMsg
 * printMsg
 * ItemSelected
 * FriendDrawer
 */
export function Chat() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  /* const [infoMsg, setInfoMsg] = useReducer(ReducerInfoMsg, initStateMsg()); */

  /* const dispatch = useDispatch();
   * const { ac_InitRoomArray } = bindActionCreators(actionCreatorsRoom, dispatch);
   * E_AllRoomInfos(ac_InitRoomArray); //to update */

  //  setInfoMsg({ type: E_ActionType.GET_CONTENT_MSG, payload: 243 });
  /* console.log("infoMsg:", infoMsg); */
  if (arrayRoom.length === 0) return <></>;
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
