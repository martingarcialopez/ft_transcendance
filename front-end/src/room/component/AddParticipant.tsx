import "../../styles/room.css";
//import { T_Room } from "../../type/chat";
/* import { RootState } from "../../redux/store";*/
/* * import { useSelector } from "react-redux"; */

import { useForm } from "react-hook-form";
import { E_CreateParticipant } from "../../components/Event";

/* function findId(item: T_Room[], occurence: string): number {
 *   let id = -1;
 *   item.forEach((data) => {
 *     if (data.name === occurence) id = data.id;
 *   });
 *   return id;
 * }
 *  */

export function AddParticipant() {
  const { register, handleSubmit } = useForm();
  /* const { arrayRoom } = useSelector((state: RootState) => state); */

  return (
    <>
      <br />
      <br />
      <h3 style={{ position: "relative", left: "25%" }}>Private</h3>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          //const roomId = findId(arrayRoom, data.roomName);
          E_CreateParticipant(1, 29);
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
        <div className="box-btn ">
          <input className="btn1 btn-new-room" type="submit" value="Add" />
          <input className="btn2 btn-new-room" type="submit" value="Remove" />
        </div>
      </form>
    </>
  );
}
