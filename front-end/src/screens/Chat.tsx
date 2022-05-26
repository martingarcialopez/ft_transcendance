import "../styles/ChatTemplate.css";
import { RootState } from "../redux/store";
import { LeftBar } from "../components/ChatLeftList";
import { PrintMsg } from "../components/ChatPrintMsg";
import { InputMsg } from "../components/ChatInputMsg";
import { ChatHeader } from "../components/ChatHeader";
//import { E_AllRoomInfos } from "../components/Event";
//import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import { useState } from "react";
//import * as actionCreatorsRoom from "../redux/action-creators/Ac_room";

/**
 * @currentMsg will contains the message from input
 * @infoMsg will contain informaabout the message
 */
export function Chat() {
  /**********************************************************************************/
  const { arrayRoom } = useSelector((state: RootState) => state);
  const [roomSelectedId, setRoomSelectedId] = useState<number>(0);

  /**********************************************************************************/
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
