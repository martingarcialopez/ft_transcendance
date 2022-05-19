import "../styles/room.css";
import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { E_UpdatePwd, E_LeaveRoom, E_DeleteRoomPw } from "./Event";
import { BasicModal } from "./BasicModal";
import { Hidden } from "./Hidden";
import { TitleOptionRoom } from "./TitleOptionRoom";

function ChangePassWord() {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          E_UpdatePwd(3, 29, data.pwd);
        })}
      >
        <input
          className="inputRoom roomProtected"
          type="password"
          placeholder="Password"
          required
          autoComplete="on"
          {...register("pwd")}
        />
        <input
          className="btn1 btn-new-room btn-Protected"
          type="submit"
          value="Enter"
        />
      </form>
    </>
  );
}

function Options({ id: number, typeRoom }: T_Room) {
  const [state, setSate] = useState<boolean>(false);
  console.log("typeRoom:", typeRoom);
  return (
    <>
      <form
        className="box-fom-option"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="btn1 opt1 btn-new-room"
          type="submit"
          value="Leave Room"
          onClick={() => E_LeaveRoom(3, 29)}
        />
        <input
          className="btn1 opt2 btn-new-room"
          type="submit"
          value="Remove Password"
          onClick={() => E_DeleteRoomPw(3, 29)}
        />
        <input
          className="btn1 opt3 btn-new-room"
          type="submit"
          style={{ display: Hidden(typeRoom) }}
          value="Set Password"
          onClick={() => {
            setSate(true);
          }}
        />
      </form>
      {state === true ? <ChangePassWord /> : <></>}
    </>
  );
}

export type T_PropsRoomArray = {
  room: T_Room[];
};

export function ModifyRoom({ room }: T_PropsRoomArray) {
  if (room.length === 0) return <></>;
  return (
    <>
      {" "}
      <TitleOptionRoom title="Modify Room" />
      {room.map((item: T_Room, index: number) => {
        return (
          <BasicModal
            channel={item}
            fct={Options}
            key={index}
            icon={FiSettings}
          />
        );
      })}
    </>
  );
}
