import "../styles/ChatTemplate.css";
//import { RootState } from "../redux/store";
import { LeftBar } from "../components/ChatLeftList";
import { PrintMsg } from "../components/ChatPrintMsg";
import { InputMsg } from "../components/ChatInputMsg";
import { ChatHeader } from "../components/ChatHeader";
import { useState } from "react";
//import { useSelector } from "react-redux";
//import { T_Room } from "../type/chat";
//import { GetUserInfo } from "../components/GetUserInfo";

/* type Props = {
 *   userRoom: T_Room[];
 * };
 *  */
/**
 * @currentMsg will contains the message from input
 * @infoMsg will contain informaabout the message
 */
export function ChatTempate() {
  const [roomSelectedId, setRoomSelectedId] = useState<number>(0);

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

/*
 * export function Chat() {
 *   const dispatch = useDispatch();
 *   const { ac_InitRoomArray } = bindActionCreators(actionCreatorsRoom, dispatch);
 *   E_AllRoomInfos(ac_InitRoomArray);
 *   return (
 *     <>
 *       <Hat />
 *     </>
 *   );
 * } */

export function Chat() {
  //  const { arrayRoom } = useSelector((state: RootState) => state);
  /* const userInfo = GetUserInfo();
   * if (!userInfo) return <h1>Loading...</h1>; */
  /* const userRoom = arrayRoom.filter((item: T_Room) =>
   *   CheckParticipant(item.participants, userInfo.id)
   * ); */

  return (
    <>
      <ChatTempate />
    </>
  );
}
