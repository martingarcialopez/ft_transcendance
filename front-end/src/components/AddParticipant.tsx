import "../styles/room.css";
import { useForm } from "react-hook-form";
import { TitleOptionRoom } from "./TitleOptionRoom";
import { T_Room } from "../type/chat";
import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";
import { useSelector } from "react-redux";
import { SetInfoUserRoom } from "./SetInfoUserRoom";
import { E_JoinRoom } from "./Event";
import { useState } from "react";

export type T_PropsRoomArray = {
  room: T_Room[];
};

function findId(room: T_Room[], occurence: string) {
  let target: T_Room = {
    name: "",
    id: -1,
    typeRoom: "",
    password: "",
    owner: [],
    members: [],
    avatar: "",
  };

  room.forEach((item: T_Room) => {
    if (item.name === occurence) target = item;
  });
  return target;
}
/**
 *add user into private room
 */

export function AddParticipant({ room }: T_PropsRoomArray) {
  const { register, handleSubmit } = useForm();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const [display, setDisplay] = useState<string>("none");
  if (room.length < 1) return <></>;
  return (
    <>
      <TitleOptionRoom title="Add user Into Private Room" />
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          const targetRoom = findId(room, data.roomName);
          if (targetRoom.id !== -1) {
            console.log("targetRoom:", targetRoom);
            const info = SetInfoUserRoom(
              userLogin.userInfo.id,
              targetRoom.id,
              targetRoom.typeRoom,
              "",
              data.userName
            );
            console.log("info:", info);
            E_JoinRoom(info);
          } else setDisplay("inline");
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
        <h4 style={{ display: display, color: "#FF0F00" }}>Invalid Room</h4>
        <br />
        {/* <div className="box-btn "> */}
        <input className="btn-new-room" type="submit" value="Add" />
        {/* <input className="btn2 btn-new-room" type="submit" value="Remove" /> */}
        {/* </div> */}
      </form>
    </>
  );
}
