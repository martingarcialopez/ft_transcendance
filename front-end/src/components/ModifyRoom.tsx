import "../styles/room.css";
import { useForm } from "react-hook-form";
import { T_Room } from "../type/chat";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { E_UpdatePwd, E_LeaveRoom, E_DeleteRoomPw } from "./Event";
import { BasicModal } from "./BasicModal";
import { Hidden } from "./Hidden";
import { TitleOptionRoom } from "./TitleOptionRoom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../redux/reducers/userReducers";
import { bindActionCreators } from "redux";
import { E_AllRoomInfos } from "../components/Event";
import * as actionCreatorsRoom from "../redux/action-creators/Ac_room";

type T_Props = {
  userId: number;
  roomId: number;
};

type T_PropsRoomArray = {
  room: T_Room[];
};

function ChangePassWord({ userId, roomId }: T_Props) {
  const { register, handleSubmit } = useForm();
  const [display, setDisplay] = useState<string>("none");
  return (
    <>
      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          E_UpdatePwd(userId, roomId, data.pwd);
          setDisplay("inline");
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
      <h4 style={{ display: display, color: "#4CAF50" }}>
        {" "}
        successfully changed the password
      </h4>
    </>
  );
}

function Options({ id, typeRoom }: T_Room) {
  const [state, setSate] = useState<boolean>(false);
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const dispatch = useDispatch();
  const { ac_InitRoomArray } = bindActionCreators(actionCreatorsRoom, dispatch);
  /* console.log("typeRoom:", typeRoom); */

  const { userInfo }: UserState = userLogin;

  if (!userInfo) {
    return <h1>Loading...</h1>;
  }

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
          onClick={() => E_LeaveRoom(userInfo.id, id)}
        />
        <input
          className="btn1 opt2 btn-new-room"
          type="submit"
          value="Remove Password"
          onClick={() => {
            E_DeleteRoomPw(userInfo.id, id);
            E_AllRoomInfos(ac_InitRoomArray); //to update
          }}
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
      {state === true ? (
        <ChangePassWord userId={userInfo.id} roomId={id} />
      ) : (
        <></>
      )}
    </>
  );
}

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
            typeItem={"btn-join-room"}
          />
        );
      })}
    </>
  );
}
