import "../styles/room.css";
import { useForm } from "react-hook-form";
import { TitleOptionRoom } from "./TitleOptionRoom";
import { T_Room } from "../type/chat";
import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";
import { useSelector } from "react-redux";
import { SetInfoUserRoom } from "./SetInfoUserRoom";

import { E_JoinRoom } from "./Event";

export type T_PropsRoomArray = {
  room: T_Room[];
};

function findId(room: T_Room[], occurence: string) {
  let target: any;
  room.forEach((item: T_Room) => {
    if (item.name === occurence) target = item;
  });
  return target;
}

export function AddParticipant({ room }: T_PropsRoomArray) {
  const { register, handleSubmit } = useForm();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  if (room.length < 1) return <></>;
  return (
    <>
      <TitleOptionRoom title="Add user Into Private Room" />
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          const targetRoom = findId(room, data.roomName);

          const info = SetInfoUserRoom(
            userLogin.userInfo.id,
            targetRoom.roomId,
            targetRoom.typeRoom,
            "",
            data.userName
          );
          E_JoinRoom(info);
        })}
      >
        <input
          className="inputRoom"
          type="text"
          placeholder="Channel Name"
          required
          autoComplete="on"
          {...register("roomName")}
        />
        <br />
        <input
          className="inputRoom"
          type="text"
          placeholder="User name"
          required
          autoComplete="on"
          {...register("userName")}
        />
        <br />
        {/* <div className="box-btn "> */}
        <input className="btn-new-room" type="submit" value="Add" />
        {/* <input className="btn2 btn-new-room" type="submit" value="Remove" /> */}
        {/* </div> */}
      </form>
    </>
  );
}
