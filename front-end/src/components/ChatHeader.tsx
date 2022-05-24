import "../styles/ChatTemplate.css";
import { T_Room, T_User, T_Msg } from "../type/chat";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

type Props = {
  infoMsg: T_Msg;
};

function findIndexItem(item: T_Room[] | T_User[], occurence: number): number {
  let tmp = 0;
  item.forEach((data, index: number) => {
    if (data.id === occurence) tmp = index;
  });
  return tmp;
}

/**
 *  this function represent the header with the avatar of  message recipients
 * item is user either a group
 */
export function ChatHeader({ infoMsg }: Props) {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const index = findIndexItem(arrayRoom, infoMsg.roomId);
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
