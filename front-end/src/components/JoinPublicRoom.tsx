import { T_Room } from "../type/chat";
import { BsPlusLg } from "react-icons/bs";
import "../styles/room.css";

import { TitleOptionRoom } from "./TitleOptionRoom";
import { SetInfoUserRoom } from "./SetInfoUserRoom";
import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";
import { useSelector } from "react-redux";

export type T_PropsRoomArray = {
  room: T_Room[];
};

/*
 * display all chanel with option to join it or leave it
 */

export function JoinPublicRoom({ room }: T_PropsRoomArray) {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  if (room.length === 0) return <></>;
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
                const info = SetInfoUserRoom(
                  userLogin.userInfo.id,
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
    </>
  );
}
