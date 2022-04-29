import { AiOutlineSetting } from "react-icons/ai";
import { useContext } from "react";
import { MyGlobalContext } from "./index";
import { e_actionType, t_channel } from "./type";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { BsPeopleFill } from "react-icons/bs";
import { userList } from "./data";
import { SettingUser } from "./settingUser";
import { TextField } from "./conversation";
/* import { useDispatch, useSelector } from "react-redux"; */
import * as actionCreators from "./redux/actionCreator";

import { RootState } from "./redux/store";

function ButtonSettingUser() {
  const user = useContext(MyGlobalContext);
  const dispatch = useDispatch();
  const { ActionCreatorInfo } = bindActionCreators(actionCreators, dispatch);
  return (
    <span
      className="setting-user"
      onClick={() => {
        if (user) {
          user.theDispatch({
            type: e_actionType.USER_SETTING_PAGE,
            payload: SettingUser,
          });
          ActionCreatorInfo("Setting User"); //to set the name of page
        }
      }}
    >
      <AiOutlineSetting className="btn-setting-user" />
    </span>
  );
}

function SelectChannel(
  ActionCreatorMsgChanel: Function,
  ActionCreatorInfo: Function,
  chanel: t_channel[],
  name: string,
  page: any
) {
  /* ActionCreatorMsgChanel({ ...chanel[1] }); */
  ActionCreatorInfo(name); //update title  of page
  if (page)
    page.theDispatch({
      type: e_actionType.TEXT_FIELD,
      payload: TextField, //loading the page of conversation
    });
}

/**
 *  print user online
 * @param props it a array of user online
 * @returns jsx
 */
export function RightMenu() {
  const { channel } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { ActionCreatorMsgIdchannelDsl, ActionCreatorInfo } =
    bindActionCreators(actionCreators, dispatch);
  const page = useContext(MyGlobalContext);
  return (
    <div>
      <BsPeopleFill size={50} color="rgb(59, 163, 76)" />
      {userList.map((item: any, index: number) => (
        <div
          className="list-of-friendships"
          key={index}
          onClick={() => {
            SelectChannel(
              ActionCreatorMsgIdchannelDsl,
              ActionCreatorInfo,
              channel,
              item.name,
              page
            );
          }}
        >
          <img className="user-icone " src={item.image} alt={item.name} />
          {item.name}
        </div>
      ))}
      <ButtonSettingUser />
    </div>
  );
}
