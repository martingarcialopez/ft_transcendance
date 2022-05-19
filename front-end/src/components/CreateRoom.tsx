import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/Ac_room";
import { useDispatch, useSelector } from "react-redux";
import { E_CreateRoom, E_AllRoomInfos } from "./Event";
import "../styles/room.css";
import { useState } from "react";
import { Hidden } from "./Hidden";
import { TitleOptionRoom } from "./TitleOptionRoom";
import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";
//import { color } from "@mui/system";

function createRoom(data: any): T_Room {
  let room: T_Room = {
    name: data.name,
    id: 0,
    typeRoom: data.typeRoom,
    password: data.password,
    owner: [],
    members: [],
    avatar: "https://avatars.dicebear.com/api/adventurer/" + data.name + ".svg",
  };
  return room;
}

export function CreateRoom() {
  const { register, handleSubmit } = useForm();
  const [state, setSate] = useState<string>("none");
  const dispatch = useDispatch();
  const { ac_AddRoom } = bindActionCreators(actionCreators, dispatch);

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  /* console.log("userLogin INFO", userLogin); */

  console.log("userId : ", userLogin.userInfo.id);
  return (
    <>
      <br />
      <br />

      <TitleOptionRoom title="Create Channel" />
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          let newRoom = createRoom(data);
          console.log("userId: ", userLogin.userInfo.id);
          E_CreateRoom(newRoom, userLogin.userInfo.id, ac_AddRoom);
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
    </>
  );
}
