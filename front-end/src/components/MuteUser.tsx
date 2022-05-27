import { useForm } from "react-hook-form";
import { TitleOptionRoom } from "./TitleOptionRoom";
import "../styles/room.css";
import { GetUserInfo } from "./GetUserInfo";
import { T_Room } from "../type/chat";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";

function getRoomId(room: T_Room[], roomName: string, userId: number): number {
  let roomId = 0;
  room.forEach((item: T_Room) => {
    if (item.name === roomName && item.owner.includes(userId)) roomId = item.id;
  });
  return roomId;
}

export function MuteUser() {
  const { register, handleSubmit } = useForm();
  const userInfo = GetUserInfo();
  const { arrayRoom } = useSelector((state: RootState) => state);
  const [display, setDisplay] = useState<string>("none");
  if (!userInfo) return <h1>Loading...</h1>;
  return (
    <>
      <TitleOptionRoom title="Mute User" />
      <h4 className="MsgError" style={{ display: display, color: "#FF0F00" }}>
        user name or room name is wrong or property problem
      </h4>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          console.log("data :", data);
          let roomId = getRoomId(arrayRoom, data.roomName, userInfo.id);
          if (roomId === 0) setDisplay("inline");
        })}
      >
        <input
          className="inputRoom"
          type="text"
          placeholder="user name"
          required
          autoComplete="on"
          {...register("userName")}
        />
        <input
          className="inputRoom"
          type="text"
          placeholder="Room Name"
          required
          autoComplete="on"
          {...register("roomName")}
        />{" "}
        <br />
        <input
          className="time"
          type="time"
          min="09:00"
          max="18:00"
          required
          {...register("time")}
        />{" "}
        <br />
        <input type="submit" className="btn-new-room" value="Mute" />
      </form>{" "}
      <br />
    </>
  );
}
