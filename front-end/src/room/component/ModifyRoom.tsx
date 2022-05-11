import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BsPlusLg } from "react-icons/bs";
import "../../styles/room.css";
import { useForm } from "react-hook-form";
import { T_Room, T_PropsRoomArray } from "../../type/chat";
import { useState } from "react";
import { socket } from "../../chat/components/ChatTemplate";

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

function EventUpdatePwd(userId: number, roomId: number, pwd: string) {
  socket.emit("updateRoomPw", {
    userId: userId,
    roomId: roomId,
    password: pwd,
  });
  console.log("send event : updatePwd");
}

function ChangePassWord() {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          EventUpdatePwd(3, 29, data.pwd);
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

function Event(userId: number, roomId: number, eventName: string) {
  socket.emit(eventName, {
    userId: userId,
    roomId: roomId,
  });
  console.log("send event : ", eventName);
}

function Options({ id: number }: T_Room) {
  const [state, setSate] = useState<boolean>(false);
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
          onClick={() => Event(3, 29, "leaveRoom")}
        />
        <input
          className="btn1 opt2 btn-new-room"
          type="submit"
          value="Remove Password"
          onClick={() => Event(3, 29, "deleteRoomPw")}
        />
        <input
          className="btn1 opt3 btn-new-room"
          type="submit"
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
          <BsPlusLg />
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
