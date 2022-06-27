import { useForm } from "react-hook-form";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../styles/room.css";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";
import { RootState } from "../redux/store";
import { E_CreateMessage } from "./Event";

type Props = {
  roomSelectedId: number;
};

export function FormInvitation({ roomSelectedId }: Props) {
  const { register, handleSubmit } = useForm();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo }: UserState = userLogin;
  if (!userInfo) {
    return <h1>Loading...</h1>;
  }
  E_CreateMessage(
    userInfo.id,
    "Invitation to play",
    roomSelectedId,
    userInfo.username
  );
  return (
    <>
      <form className="box-fom-procted" onSubmit={handleSubmit((data) => {})}>
        <select className="inputRoom" id="pet-select" {...register("level")}>
          <option value="public">Easy</option>
          <option value="private">Normal</option>
          <option value="protected">Hard</option>
        </select>

        <input
          className="btn1 btn-new-room btn-Protected"
          type="submit"
          value="Invitation"
        />
      </form>
    </>
  );
}

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

export function CreateInvitation({ roomSelectedId }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="test" onClick={handleOpen}>
        Invitation
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormInvitation roomSelectedId={roomSelectedId} />
        </Box>
      </Modal>
    </>
  );
}
