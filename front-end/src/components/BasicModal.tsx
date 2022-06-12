import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../styles/room.css";
import { T_Room } from "../type/chat";

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

export type T_Props = {
  channel: T_Room;
  fct: Function;
  key: number;
  icon: any;
  typeItem: string;
};

export function BasicModal(props: T_Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="roomList test" onClick={handleOpen}>
        <span className={props.typeItem}>
          <props.icon />
        </span>
        {props.channel.name}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <props.fct {...props.channel} />
        </Box>
      </Modal>
    </>
  );
}
