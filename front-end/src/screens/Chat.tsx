import "../styles/ChatTemplate.css";
import { T_Msg, T_Action } from "../type/chat";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useState, useReducer } from "react";
import { LeftBar } from "../components/ChatLeftList";
import { E_ActionType } from "../type/Enum";
import { PrintMsg } from "../components/ChatPrintMsg";
import { InputMsg } from "../components/ChatInputMsg";
import { ChatHeader } from "../components/ChatHeader";

function initInfoMsg(): T_Msg {
  return {
    fromName: "",
    fromId: 0,
    roomId: 0,
    roomName: "",
    content: "",
  };
}

export function infoMsgReducer(state: T_Msg = initInfoMsg(), action: T_Action) {
  switch (action.type) {
    case E_ActionType.GET_ROOM_NAME: {
      return { ...state, roomName: action.payload };
    }
    case E_ActionType.GET_ROOM_ID: {
      return { ...state, roomId: action.payload };
    }
    case E_ActionType.ID_CURRENT_USER: {
      return { ...state, fromId: action.payload };
    }
    default:
      return state;
  }
}

/**
 * @currentMsg will contains the message from input
 * @infoMsg will contain informaabout the message
 */
export function Chat() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const [currentMsg, setCurrentMsg] = useState([]);
  const [infoMsg, setInfoMsg] = useReducer(infoMsgReducer, initInfoMsg());

  if (arrayRoom.length === 0) return <></>;
  //  console.log("infoMsg:", infoMsg);
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

            <LeftBar setInfoMsg={setInfoMsg} />
          </div>
          <div className="col-md-8">
            <ChatHeader infoMsg={infoMsg} />

            <div className="chat-panel">
              <PrintMsg contentMsg={currentMsg} />

              <div className="row">
                <div className="col-12">
                  <div className="chat-box-tray">
                    <i className="material-icons">sentiment_very_satisfied</i>

                    <InputMsg
                      content={currentMsg}
                      setContent={setCurrentMsg}
                      roomId={infoMsg.roomId}
                    />
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
