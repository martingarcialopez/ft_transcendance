import "../styles/ChatTemplate.css";
import { T_Room, T_Participant } from "../type/chat";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

type Props = {
  roomSelectedId: number;
};

function findIndexItem(item: T_Room[], occurence: number): number {
  let tmp = 0;
  item.forEach((data, index: number) => {
    if (data.id === occurence) tmp = index;
  });
  return tmp;
}

//function PrintParticipants() {}

/**
 * this function represent the header with the avatar of  message recipients
 * item is user either a group
 * @roomSelectedId it is the room id which was selected on the left bar side
 */
export function ChatHeader({ roomSelectedId }: Props) {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const index = findIndexItem(arrayRoom, roomSelectedId);
  let item: T_Room = arrayRoom[index];
  let participant: T_Participant[] = item.participants;
  /* console.log("participant:", participant); */
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
