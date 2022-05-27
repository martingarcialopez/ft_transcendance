import { useForm } from "react-hook-form";
import { TitleOptionRoom } from "./TitleOptionRoom";
import "../styles/room.css";
import { GetUserInfo } from "./GetUserInfo";
import { E_BanUser } from "./Event";
import { T_Room } from "../type/chat";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";

function getRoomId(room: T_Room[], roomName: string): number {
  let roomId = 0;
  room.forEach((item: T_Room) => {
    if (item.name === roomName) roomId = item.id;
  });
  return roomId;
}

export function BlockUSer() {
  const { register, handleSubmit } = useForm();
  const userInfo = GetUserInfo();
  const { arrayRoom } = useSelector((state: RootState) => state);
  const [display, setDisplay] = useState<string>("none");
  if (!userInfo) return <h1>Loading...</h1>;
  return (
    <>
      <TitleOptionRoom title="Ban User" />
      <h4 className="MsgError" style={{ display: display, color: "#FF0F00" }}>
        user name or room name is wrong
      </h4>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          console.log(
            "user to ban:",
            data,
            "userInfo id : ",
            userInfo.id,
            "roomId",
            getRoomId(arrayRoom, data.roomName)
          );
          let roomId = getRoomId(arrayRoom, data.roomName);
          if (roomId === 0) setDisplay("inline");
          else E_BanUser(userInfo.id, data.userName, roomId);
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
        />

        <br />
        <input type="submit" className="btn-new-room" value="Ban" />
      </form>
    </>
  );
}
