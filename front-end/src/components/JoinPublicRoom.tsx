import { T_Room } from "../type/chat";
import { BsPlusLg } from "react-icons/bs";
import "../styles/room.css";
import { E_JoinRoom } from "./Event";
import { TitleOptionRoom } from "./TitleOptionRoom";

export type T_PropsRoomArray = {
  room: T_Room[];
};

/*
 * display all chanel with option to join it or leave it
 */

export function JoinPublicRoom({ room }: T_PropsRoomArray) {
  return (
    <>
      <TitleOptionRoom title="Join Public Room" />
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
