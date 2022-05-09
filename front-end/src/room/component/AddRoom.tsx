import "../styles/settingChannel.css";
import { useForm } from "react-hook-form";
import { T_Room } from "../../type/chat";
import { bindActionCreators } from "redux";

import { socket } from "../../chat/components/ChatTemplate";
import * as actionCreators from "../../redux/action-creators/Ac_room";
import { useDispatch } from "react-redux";

function createRoom(data: any): T_Room {
  let room: T_Room = {
    name: data.name,
    id: 0,
    typeRoom: data.typeRoom,
    password: data.password,
    owner: [],
    members: [],
    avatar: "",
  };
  return room;
}

/**
 * to get id, there for need to send the  room at server so that it give back the id
 */
function GetIdRoom(newRoom: T_Room) {
  /* socket.emit("createRoom", newRoom); */
  socket.emit("createRoom", {
    name: newRoom.name,
    creatorId: 2,
    typeRoom: newRoom.typeRoom,
    password: newRoom.password,
  });
  socket.on("idRoom", (receive: { id: number; name: string }) => {
    console.log("reponse creation Room : ", receive);
    newRoom.id = receive.id;
  });
}

export function AddRoom() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { ac_AddRoom } = bindActionCreators(actionCreators, dispatch);
  /* const [inputValue, setInputValue] =  */
  return (
    <>
      <br />
      <br />
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          let newRoom = createRoom(data);
          GetIdRoom(newRoom);
          console.log("newRoom:", newRoom);
          ac_AddRoom(newRoom);
        })}
      >
        <input
          type="text"
          placeholder="Name of new channel"
          required
          autoComplete="on"
          {...register("name")}
        />
        <br />
        <input
          type="password"
          placeholder="password (optionnal)"
          autoComplete="on"
          {...register("password")}
        />
        <br />
        <select id="pet-select" {...register("typeRoom")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <br />
        <input type="submit" value="Add" />
      </form>
    </>
  );
}
