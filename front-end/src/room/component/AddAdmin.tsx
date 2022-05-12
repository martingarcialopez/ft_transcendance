import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GrUserAdmin } from "react-icons/gr";
import "../../styles/room.css";
//import { useForm } from "react-hook-form";
import { T_Room, T_PropsRoomArray } from "../../type/chat";
//import { useState } from "react";
//import { E_UpdatePwd, E_SendEvent } from "../../components/Event";
import { useForm } from "react-hook-form";
import { E_ManageAdmin } from "../../components/Event";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Adduser({ id: number }: T_Room) {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <br />
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

function BasicModal(room: T_Room, index: number) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div key={index}>
      <div className="roomList" onClick={handleOpen}>
        <span className="btn-join-room">
          <GrUserAdmin />
        </span>
        {room.name}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Adduser {...room} />
        </Box>
      </Modal>
    </div>
  );
}

export function AddAdmin({ room }: T_PropsRoomArray) {
  return (
    <>
      {" "}
      <h3 style={{ position: "relative", left: "25%" }}>
        Mangement Admin Channel
      </h3>
      {room.map(BasicModal)}
    </>
  );
}
