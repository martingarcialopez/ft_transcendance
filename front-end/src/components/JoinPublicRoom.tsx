import { T_Room } from "../type/chat";
import { BsPlusLg } from "react-icons/bs";
import "../styles/room.css";
import { TitleOptionRoom } from "./TitleOptionRoom";
import { SetInfoUserRoom } from "./SetInfoUserRoom";
import { E_JoinRoom } from "./Event";
import { GetUserInfo } from "./GetUserInfo";

type T_PropsRoomArray = {
  room: T_Room[];
};

/*
 * join public room
 */
export function JoinPublicRoom({ room }: T_PropsRoomArray) {
  const userInfo = GetUserInfo();
  if (room.length === 0) return <></>;
  if (!userInfo) return <h1>Loading...</h1>;
  return (
    <>
      <TitleOptionRoom title="Join Public Room" />
      <div className="box-Room">
        {room.map((item: T_Room, index: number) => (
          <div className="roomList" key={index}>
            <span
              className="btn-join-room"
              onClick={() => {
                const info = SetInfoUserRoom(
                  userInfo.id,
                  item.id,
                  item.typeRoom,
                  "",
                  ""
                );
                E_JoinRoom(info);
              }}
            >
              <BsPlusLg />
            </span>
            {item.name}
          </div>
        ))}
      </div>
      <br />
    </>
  );
}
