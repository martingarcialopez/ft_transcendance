import { useSelector } from "react-redux";
import { T_Room, T_User, objInfoMsg } from "../type/chat";
import { RootState } from "../redux/store";
import { E_GetMessage } from "../components/Event";
import { UserState } from "../redux/reducers/userReducers";

type Props = {
  setRoomSelectedId: Function;
};
/**
 * list of item in the left side
 * item can be either user or room
 * this function  manage the click on the left bar
 * get id of room cliked and the userId
 */

export function LeftBar({ setRoomSelectedId }: Props) {
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );
  const { arrayRoom } = useSelector((state: RootState) => state);
  const { userInfo }: UserState = userLogin;
  if (!userInfo) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {arrayRoom.map((item: T_Room | T_User, index: number) => {
        return (
          <div key={index}>
            <div
              className="friend-drawer friend-drawer--onhover"
              onClick={(e) => {
                E_GetMessage(userInfo.id, item.id);

                console.log("selected room:", item.name, "id:", item.id);
                objInfoMsg.roomId = item.id;
                objInfoMsg.fromId = userInfo.id;
                objInfoMsg.fromName = item.name;
                setRoomSelectedId(item.id);
              }}
            >
              <img className="profile-image" src={item.avatar} alt="" />
              <div key={index} className="text">
                <h6>{item.name}</h6>
                <p className="text-muted">Hey, you're arrested!</p>
              </div>
              <span className="time text-muted small">13:21</span>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
}
