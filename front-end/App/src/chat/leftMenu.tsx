import "./style/index.css";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { AddNewChanel } from "./settingChanel";
import { useContext } from "react";
import { MyGlobalContext } from "./index";
import { e_actionType, t_chanel } from "./type";
import { TextField } from "./conversation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { bindActionCreators } from "redux";
import * as actionCreators from "./redux/actionCreator";

/**
 * lead the page of setting chanel
 * that page is lead
 * @param props array of chanel
 * @returns jsx
 */
function ButtonSettingChanel() {
  const page = useContext(MyGlobalContext);
  const dispatch = useDispatch();
  const { ActionCreatorInfo } = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <AiOutlineSetting
        className="btn-setting-channel"
        onClick={() => {
          if (page) {
            page.theDispatch({
              type: e_actionType.SET_CHANEL,
              payload: AddNewChanel,
            });
            ActionCreatorInfo("Create Chanel"); //to set the name of page
          }
        }}
      />
    </>
  );
}

/**
 *
 *this button bring to the home page of chat
 */
function ButtonChanel() {
  const user = useContext(MyGlobalContext);

  return (
    <span
      className="icon-channel"
      onClick={() => {
        if (user)
          user.theDispatch({
            type: e_actionType.TEXT_FIELD,
            payload: TextField,
          });
      }}
    >
      <IoIosPeople size={60} color="rgb(240, 128, 128)" />
    </span>
  );
}

/**
 * this fuction take a chanel name then return back the index of that chanel
 *
 */
function getIndexChanel(tab: t_chanel[], name_chanel: string): number {
  let index: number = -1;
  index = tab.findIndex((element: t_chanel) => element.name === name_chanel);
  return index;
}

/**
 * when there are a selecting a channel, it required to update the object message to setup the destinator
 * when there are a selecting a channel it need to update :
 *           -the object message to setup the destinator
 *           -title  of page
 * led the conversation page to write message
 */
function SelectChannel(
  ActionCreatorMsgChanel: Function,
  ActionCreatorInfo: Function,
  chanel: t_chanel[],
  name: string,
  page: any
) {
  let index = getIndexChanel(chanel, name);
  console.log("index == ", index);
  ActionCreatorMsgChanel({ ...chanel[index] });
  ActionCreatorInfo(name); //update title  of page
  if (page)
    page.theDispatch({
      type: e_actionType.TEXT_FIELD,
      payload: TextField, //loading the page of conversation
    });
}

/**
 *display everything in the left side of page chat
 *
 */
export function LeftMenu() {
  const { chanel } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { ActionCreatorMsgChanel, ActionCreatorInfo } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const page = useContext(MyGlobalContext);
  /* const { message } = useSelector((state: RootState) => state); */
  return (
    <>
      <ButtonChanel /> <br></br>
      {chanel.map((item: t_chanel, index: number) => (
        <div
          onClick={() => {
            SelectChannel(
              ActionCreatorMsgChanel,
              ActionCreatorInfo,
              chanel,
              item.name,
              page
            );
          }}
          className="list-of-my-channels"
          key={index}
        >
          {item.name}
        </div>
      ))}
      <ButtonSettingChanel />
    </>
  );
}
