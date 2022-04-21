import "./style.css";
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
  const user = useContext(MyGlobalContext);
  const dispatch = useDispatch();
  const { ActionCreatorInfo } = bindActionCreators(actionCreators, dispatch);
  return (
    <span
      className="setting-chanel"
      onClick={() => {
        if (user) {
          user.theDispatch({
            type: e_actionType.SET_CHANEL,
            payload: AddNewChanel,
          });
          ActionCreatorInfo("Setting chanel"); //to set the name of page
        }
      }}
    >
      <AiOutlineSetting size={60} color="rgb(93, 173, 226 )" />
    </span>
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
      className="icon-chanel"
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
  /* let tmp = document.getElementById(name_chanel);
   * console.log(" name_chanel :", name_chanel);
   * if (tmp) {
   *   index = tab.findIndex((element: t_chanel) => element.name === name_chanel);
   * } */
  index = tab.findIndex((element: t_chanel) => element.name === name_chanel);
  return index;
}

/**
 * print the liste of change in the left side
 * handle the click on each item
 */
export function PrintChannels() {
  const { chanel } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { ActionCreatorMsgChanel, ActionCreatorInfo } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const user = useContext(MyGlobalContext);
  /* const user = useContext(MyGlobalContext); */
  /* const { message } = useSelector((state: RootState) => state); */
  return (
    <>
      <ButtonChanel /> <br></br>
      {chanel.map((item: t_chanel, index: number) => (
        <div
          onClick={() => {
            let index = getIndexChanel(chanel, item.name);
            console.log("index == ", index);
            ActionCreatorMsgChanel({ ...chanel[index] });
            ActionCreatorInfo(item.name);
            if (user)
              user.theDispatch({
                type: e_actionType.TEXT_FIELD,
                payload: TextField, //loading the page of conversation
              });
          }}
          className="user-name chanel-name"
          key={index}
        >
          {item.name}
        </div>
      ))}
      <ButtonSettingChanel />
    </>
  );
}
