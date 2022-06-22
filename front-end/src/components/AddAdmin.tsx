import { GrUserAdmin } from "react-icons/gr";
import "../styles/room.css";
import { T_Room } from "../type/chat";
import { useForm } from "react-hook-form";
import { E_ManageAdmin } from "./Event";
import { BasicModal } from "./BasicModal";
import { TitleOptionRoom, TitleModal } from "./TitleOptionRoom";
import { RootState } from "../redux/store";
import { UserState } from "../redux/reducers/userReducers";
import { useSelector } from "react-redux";

export type T_PropsRoomArray = {
  room: T_Room[];
};

/**
 * the form to add a new admin into channel
 */
function Adduser({ id }: T_Room) {
  const { register, handleSubmit } = useForm();
  //  const dispatch = useDispatch();

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo }: UserState = userLogin;

  if (!userInfo) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <br />
      <TitleModal title="Add another admin" />
      <form
        className="box-fom-procted"
        onSubmit={handleSubmit((data) => {
          //E_JoinRoom(3, 29, data.pwd);
          E_ManageAdmin(userInfo.id, id, data.login, true);
        })}
      >
        <input
          className="inputRoom roomProtected"
          type="ext"
          placeholder="user name"
          required
          autoComplete="on"
          {...register("login")}
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
  if (room.length === 0) return <></>;
  return (
    <>
      {" "}
      <TitleOptionRoom title="Mangement Admin Channel" />
      {room.map((item: T_Room, index: number) => {
        return (
          <BasicModal
            channel={item}
            fct={Adduser}
            key={index}
            icon={GrUserAdmin}
            typeItem={"btn-join-room"}
          />
        );
      })}
    </>
  );
}
