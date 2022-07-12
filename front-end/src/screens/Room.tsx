import { CreateRoom } from "../components/CreateRoom";
import { AddParticipant } from "../components/AddParticipant";
import { JoinPublicRoom } from "../components/JoinPublicRoom";
import { JoinProtectedRoom } from "../components/JoinProtectedRoom";
import { RootState } from "../redux/store";
import { ModifyRoom } from "../components/ModifyRoom";
import { AddAdmin } from "../components/AddAdmin";
import { useSelector } from "react-redux";
import { BlockUSer } from "../components/BlockUser";
import { MuteUser } from "../components/MuteUser";
import { bindActionCreators } from "redux";
import * as actionCreatorsRoom from "../redux/action-creators/Ac_room";
import { E_AllRoomInfos } from "../components/Event";
import { useDispatch } from "react-redux";
import { FilterParticipant } from "../components/FilterRoom";
import { FilterType } from "../components/FilterRoom";
import { FilterAdmin } from "../components/FilterRoom";
import { GetUserInfo } from "../components/GetUserInfo";
/* import { SortLeaderboard } from "../components/SortLeaderboard"; */
// import { CreateLeader } from "../components/CreateArrayLeaderBoard";

function SettingRoom() {
  const { arrayRoom } = useSelector((state: RootState) => state);
  const publicRoom = FilterType(arrayRoom, "public");
  const protectedRoom = FilterType(arrayRoom, "protected");
  const pvRoom = FilterType(arrayRoom, "private");

  const userInfo = GetUserInfo();
  if (!userInfo) {
    return <h1>Loading...</h1>;
  }

  const roomUserIsAdmin = FilterAdmin(arrayRoom, userInfo.id);
  return (
    <>
      <CreateRoom />
      <AddParticipant room={FilterParticipant(pvRoom, userInfo.id, false)} />
      <JoinPublicRoom
        room={FilterParticipant(publicRoom, userInfo.id, false)}
      />
      <JoinProtectedRoom
        room={FilterParticipant(protectedRoom, userInfo.id, false)}
      />
      <ModifyRoom room={roomUserIsAdmin} />
      <br />
      <AddAdmin room={roomUserIsAdmin} />
      <BlockUSer />
      <MuteUser />
    </>
  );
}

/**
 * this component  contain the setting room options
 */
export function Room() {
  const dispatch = useDispatch();
  const { ac_InitRoomArray } = bindActionCreators(actionCreatorsRoom, dispatch);
  //init arrayRoom
  E_AllRoomInfos(ac_InitRoomArray);
  /* SortLeaderboard(); */

  return (
    <>
      <SettingRoom />
    </>
  );
}
