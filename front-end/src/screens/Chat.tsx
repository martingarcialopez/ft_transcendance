import "../styles/ChatTemplate.css";
import { LeftBar } from "../components/ChatLeftList";
import { PrintMsg } from "../components/ChatPrintMsg";
import { InputMsg } from "../components/ChatInputMsg";
import { ChatHeader } from "../components/ChatHeader";
import { useState } from "react";
import { bindActionCreators } from "redux";
import * as actionCreatorsRoom from "../redux/action-creators/Ac_room";
import { E_AllRoomInfos } from "../components/Event";
import { useDispatch } from "react-redux";

export function ChatTempate() {
  const [roomSelectedId, setRoomSelectedId] = useState<number>(0);

  return (
    <div>
      <div className="container-template">
        <div className="row no-gutters ">
          <div className="col-md-4 border-right ">
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

            <LeftBar setRoomSelectedId={setRoomSelectedId} />
          </div>
          <div className="col-md-8">
            <ChatHeader roomSelectedId={roomSelectedId} />

            <div className="chat-panel">
              <PrintMsg />

              <div className="row">
                <div className="col-12">
                  <div className="chat-box-tray">
                    <i className="material-icons">sentiment_very_satisfied</i>

                    <InputMsg />
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

export function Chat() {
  /****************************************/
  /*
   *cette function permet d'initialisé le tableau de rooms
   */
  const dispatch = useDispatch();
  const { ac_InitRoomArray } = bindActionCreators(actionCreatorsRoom, dispatch);
  E_AllRoomInfos(ac_InitRoomArray);
  /****************************************/
  return (
    <>
      <ChatTempate />
    </>
  );
}
