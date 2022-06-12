import Typography from "@mui/material/Typography";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import "../styles/room.css";
import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
import { BasicModal } from "./BasicModal";
import { TitleOptionRoom } from "./TitleOptionRoom";

import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";
import { useSelector } from "react-redux";
import { SetInfoUserRoom } from "./SetInfoUserRoom";
import { E_JoinRoom } from "./Event";

type T_PropsRoomArray = {
  room: T_Room[];
};

/* function IsProctect({ roomId, setRoomId }: AppProps) { */

function IsProctect({ id, typeRoom }: T_Room) {
  const { register, handleSubmit } = useForm();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo }: UserState = userLogin;

  if (!userInfo) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        align="center"
      >
        Channel Protected by password
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }} align="center">
        Enter Password to join channel
      </Typography>

      <br />
      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          const info = SetInfoUserRoom(userInfo.id, id, typeRoom, data.pwd, "");
          E_JoinRoom(info);
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

/**
 * management the joining a  proctected room
 * to Join a Protected Room  password is require
 */
export function JoinProtectedRoom({ room }: T_PropsRoomArray) {
  if (room.length === 0) return <></>;
  return (
    <>
      {" "}
      <TitleOptionRoom title="Join Protected Room" />
      {room.map((item: T_Room, index: number) => {
        return (
          <BasicModal
            channel={item}
            fct={IsProctect}
            key={index}
            icon={RiGitRepositoryPrivateFill}
            typeItem={"btn-join-room"}
          />
        );
      })}
      <br />
    </>
  );
}
