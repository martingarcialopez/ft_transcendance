import { useSelector } from "react-redux";
import { T_Room, T_User } from "../type/chat";
import { RootState } from "../redux/store";
import { E_GetMessage } from "../components/Event";
import { UserState } from "../redux/reducers/userReducers";
import { E_ActionType } from "../type/Enum";

/**
 * list of item in the left side
 * item can be either user or room
 * this function  manage the click on the left bar
 * get id of room cliked and the userId
 */

type Props = {
  setInfoMsg: Function;
};

export function LeftBar({ setInfoMsg }: Props) {
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
                setInfoMsg({
                  type: E_ActionType.GET_ROOM_ID,
                  payload: item.id,
                });
                setInfoMsg({
                  type: E_ActionType.ID_CURRENT_USER,
                  payload: userInfo.id,
                });
                console.log("userInfo:", userInfo);
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
