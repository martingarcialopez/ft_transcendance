import { GrUserAdmin } from "react-icons/gr";
import "../styles/room.css";
//import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
//import { useState } from "react";
//import { E_UpdatePwd, E_SendEvent } from "../../components/Event";
import { useForm } from "react-hook-form";
import { E_ManageAdmin } from "./Event";

import { BasicModal } from "./BasicModal";

export type T_PropsRoomArray = {
  room: T_Room[];
};

/**
 * the form to add a new admin into channel
 */
function Adduser({ id: number }: T_Room) {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <br />
      <h3 style={{ fontSize: "calc(0.75em + 2vmin)" }}>Add another admin</h3>

      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          //E_JoinRoom(3, 29, data.pwd);
          E_ManageAdmin(3, 29, true);
        })}
      >
        <input
          className="inputRoom roomProtected"
          type="ext"
          placeholder="user name"
          required
          autoComplete="on"
          {...register("name")}
        />
        <input
          className="btn1 btn-new-room btn-Protected"
          type="submit"
          value="Enter"
        />
      </form>
    </div>
  );
}

/**
 * add a new new user admin into a channel
 */
export function AddAdmin({ room }: T_PropsRoomArray) {
  return (
    <>
      {" "}
      <h3 style={{ position: "relative", left: "25%" }}>
        Mangement Admin Channel
      </h3>
      {room.map((item: T_Room, index: number) => {
        return (
          <BasicModal
            channel={item}
            fct={Adduser}
            key={index}
            icon={GrUserAdmin}
          />
        );
      })}
    </>
  );
}
