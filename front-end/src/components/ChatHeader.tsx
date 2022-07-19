import "../styles/ChatTemplate.css";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { T_Room, T_Participant } from "../type/chat";
import { CreateInvitation } from "./CreateInvitation";
/* import { Pong } from "../screens/PongScreen"; */
/* import { useHistory } from "react-router-dom"; */
import { useNavigate } from "react-router-dom";

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

export function AccepGame() {
  const navigate = useNavigate();

  return (
    <>
      <button className="accepte" onClick={() => navigate("/pong")}>
        accept
      </button>
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
            <CreateInvitation roomSelectedId={roomSelectedId} />
          </span>
        </div>
      </div>
    </>
  );
}
