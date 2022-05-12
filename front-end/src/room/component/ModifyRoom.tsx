import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FiSettings } from "react-icons/fi";
import "../../styles/room.css";
import { useForm } from "react-hook-form";
import { T_Room, T_PropsRoomArray } from "../../type/chat";
import { useState } from "react";
import {
  E_UpdatePwd,
  E_LeaveRoom,
  E_DeleteRoomPw,
} from "../../components/Event";

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

function Hidden(typeRoom: string) {
  if (typeRoom === "protected") return "inline";
  return "none";
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

function BasicModal(room: T_Room, index: number) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div key={index}>
      <div className="roomList" onClick={handleOpen}>
        <span className="btn-join-room">
          <FiSettings />
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
          <Options {...room} />
        </Box>
      </Modal>
    </div>
  );
}

export function ModifyRoom({ room }: T_PropsRoomArray) {
  return (
    <>
      {" "}
      <h3 style={{ position: "relative", left: "25%" }}>Modify Room</h3>
      {room.map(BasicModal)}
    </>
  );
}
