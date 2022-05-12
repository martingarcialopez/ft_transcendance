import "../../styles/room.css";
import { useForm } from "react-hook-form";
import { T_Room } from "../../type/chat";
import { bindActionCreators } from "redux";

import * as actionCreators from "../../redux/action-creators/Ac_room";
import { useDispatch } from "react-redux";
import { E_CreateRoom } from "../../components/Event";

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

export function AddRoom() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { ac_AddRoom } = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <br />
      <br />
      <h3 style={{ position: "relative", left: "25%" }}>Create Channel</h3>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          let newRoom = createRoom(data);
          E_CreateRoom(newRoom);
          console.log("newRoom:", newRoom);
          ac_AddRoom(newRoom);
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
        />
        <br />
        <select className="inputRoom" id="pet-select" {...register("typeRoom")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="private">Protected</option>
        </select>
        <br />
        <input type="submit" className="btn-new-room" value="New" />
      </form>
    </>
  );
}
