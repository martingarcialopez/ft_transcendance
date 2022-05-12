import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BsPlusLg } from "react-icons/bs";
import "../../styles/room.css";
import { useForm } from "react-hook-form";
import { JoinRoom } from "./RoomPublic";

import { T_Room, T_PropsRoomArray } from "../../type/chat";

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

/* function IsProctect({ roomId, setRoomId }: AppProps) { */
function IsProctect({ id: number }: T_Room) {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <br />
      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          console.log("protected: ", data.target);
          JoinRoom(3, 29, data.pwd);
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
    </div>
  );
}

function BasicModal(room: T_Room, index: number) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (room.typeRoom != "protected") return <div key={index}></div>;
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Channel Protected by password
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            align="center"
          >
            Enter Password to join channel
          </Typography>
          <IsProctect {...room} />
        </Box>
      </Modal>
    </div>
  );
}

export function RoomProtected({ room }: T_PropsRoomArray) {
  return (
    <>
      {" "}
      <h3 style={{ position: "relative", left: "25%" }}>Join Protected Room</h3>
      {room.map(BasicModal)}
    </>
  );
}
