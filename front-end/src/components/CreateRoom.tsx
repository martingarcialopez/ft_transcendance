import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators/Ac_room";
import { useDispatch, useSelector } from "react-redux";
import { E_CreateRoom, socket } from "./Event";
import "../styles/room.css";
import { useState } from "react";
import { Hidden } from "./Hidden";

import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";

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
  return (
    <>
      <br />
      <br />
      <h3 style={{ position: "relative", left: "25%", width: "25%" }}>
        Create Channel
      </h3>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          let newRoom = createRoom(data);
          E_CreateRoom(newRoom, userLogin.userInfo.id);
          console.log("userId : ", userLogin.userInfo.id);
          console.log("newRoom:", newRoom);
          socket.on("idRoom", (receive: { id: number }) => {
            console.log("reponse creation Room : ", receive);
            newRoom.id = receive.id;
            ac_AddRoom(newRoom);
          });
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
        <br />
        <input
          className="inputRoom"
          type="password"
          placeholder="password (optionnal for private and public)"
          autoComplete="on"
          {...register("password")}
          style={{ display: state }}
        />
        <br />
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
