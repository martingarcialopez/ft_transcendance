import "../styles/ChatTemplate.css";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { T_Room, T_Participant } from "../type/chat";
import { CreateInvitation } from "./CreateInvitation";
import { Pong } from "../screens/PongScreen";

type Props = {
  roomSelectedId: number;
};

type PropsParticipant = {
  participant: T_Participant[];
};

function findIndexItem(item: T_Room[], occurence: number): number {
  let tmp = 0;
  item.forEach((data, index: number) => {
    if (data.id === occurence) tmp = index;
  });
  return tmp;
}

function PrintParticipants({ participant }: PropsParticipant) {
  return (
    <>
      {participant.map((item: any, index: number) => {
        return <span key={index}>{item.user.username}, </span>;
      })}
    </>
  );
}

function AccepGame() {
  return (
    <>
      <span className="accepte" onClick={Pong}>
        Accepte
      </span>
    </>
  );
}

/**
 * this function represent the header with the avatar of  message recipients
 * item is user either a group
 * @roomSelectedId it is the room id which was selected on the left bar side
 */
export function ChatHeader({ roomSelectedId }: Props) {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const index = findIndexItem(arrayRoom, roomSelectedId);
  let item: T_Room = arrayRoom[index];
  return (
    <>
      <div className="settings-tray">
        <div className="friend-drawer no-gutters friend-drawer--grey">
          <img className="profile-image" src={item.avatar} alt="" />
          <div className="text">
            <h6>{item.name}</h6>
            <p className="text-muted">
              <PrintParticipants participant={item.participants} />
            </p>
          </div>
          <span className="settings-tray--right">
            <AccepGame />
            <CreateInvitation />
            {/* <i className="material-icons" >cached</i> */}
          </span>
        </div>
      </div>
    </>
  );
}
