import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
import { E_CreateRoom } from "./Event";
import "../styles/room.css";
import { useState } from "react";
import { Hidden } from "./Hidden";
import { TitleOptionRoom } from "./TitleOptionRoom";
import { GetUserInfo } from "./GetUserInfo";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/Ac_room";
import { useDispatch } from "react-redux";

function createRoom(data: any): T_Room {
  let room: T_Room = {
    name: data.name,
    id: 0,
    typeRoom: data.typeRoom,
    password: data.password,
    owner: [],
    participants: [],
    avatar:
      "https://www.pngkit.com/png/detail/131-1318731_group-of-people-in-a-formation-free-icon.png",
  };
  return room;
}

export function CreateRoom() {
  const { register, handleSubmit } = useForm();
  const [state, setSate] = useState<string>("none");
  const [msgError, setMsgError] = useState<string>("none");
  const dispatch = useDispatch();
  const { ac_InitRoomArray } = bindActionCreators(actionCreators, dispatch);
  /**********************************/
  const userInfo = GetUserInfo();
  if (!userInfo) return <h1>Loading...</h1>;
  return (
    <>
      <br /> <br />
      <TitleOptionRoom title="Create Channel" />
      <h4 className="MsgError" style={{ display: msgError, color: "#FF0F00" }}>
        this name is already exist
      </h4>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          let newRoom = createRoom(data);
          E_CreateRoom(newRoom, userInfo.id, ac_InitRoomArray, setMsgError);
        })}
      >
        <input
          className="inputRoom"
          type="text"
          placeholder="Name of new channel"
          required
          autoComplete="on"
          {...register("name")}
        />
        <input
          className="inputRoom"
          type="password"
          placeholder="password (optionnal for private and public)"
          autoComplete="on"
          {...register("password")}
          style={{ display: state }}
        />
        <select
          className="inputRoom"
          id="pet-select"
          {...register("typeRoom")}
          onChange={(e) => {
            setSate(Hidden(e.target.value));
          }}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="protected">Protected</option>
        </select>
        <br />
        <input type="submit" className="btn-new-room" value="New" />
      </form>
      <br />
    </>
  );
}
