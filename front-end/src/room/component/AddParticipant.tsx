import "../../styles/room.css";
import { T_Room } from "../../type/chat";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { socket } from "../../chat/components/ChatTemplate";
import { useForm } from "react-hook-form";

function createParticipant(usrId: number, roomId: number) {
  if (usrId > 0 && roomId > 0) {
    console.log("userId: ", usrId, "room id:", roomId);
    socket.emit("createParticipant", {
      userId: usrId,
      roomId: roomId,
    });
    socket.on("participantId", (receive: { id: number }) => {
      console.log("reponse participant : ", receive);
    });
  }
}

function findId(item: T_Room[], occurence: string): number {
  let id = -1;
  item.forEach((data) => {
    if (data.name === occurence) id = data.id;
  });
  return id;
}

export function AddParticipant() {
  const { register, handleSubmit } = useForm();
  const { arrayRoom } = useSelector((state: RootState) => state);
  /* findId(arrayRoom,  ) */

  return (
    <>
      <br />
      <br />
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          const roomId = findId(arrayRoom, data.roomName);
          createParticipant(1, 29);
        })}
      >
        <input
          className="inputRoom"
          type="text"
          placeholder="Room Name"
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
        <div className="box-btn ">
          <input className="btn1 btn-new-room" type="submit" value="Add" />
          <input className="btn2 btn-new-room" type="submit" value="Remove" />
        </div>
      </form>
    </>
  );
}
