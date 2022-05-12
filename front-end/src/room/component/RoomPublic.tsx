import { T_Room, T_PropsRoomArray } from "../../type/chat";
import { BsPlusLg } from "react-icons/bs";
import "../../styles/room.css";
//import { socket } from "../../chat/components/ChatTemplate";
import { E_JoinRoom } from "../../components/Event";

/*
 * display all chanel with option to join it or leave it
 */

export function RoomPublic({ room }: T_PropsRoomArray) {
  return (
    <>
      <h3 style={{ position: "relative", left: "25%" }}>Join Public Room</h3>
      <div className="box-Room">
        {room.map((item: T_Room, index: number) => (
          <div className="roomList" key={index}>
            <span
              className="btn-join-room"
              onClick={() => {
                console.log("Public: ");
                E_JoinRoom(3, 23, "");
              }}
            >
              <BsPlusLg />
            </span>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}
