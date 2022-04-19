import React from "react";
import "./style.css";
import { BsPeopleFill } from "react-icons/bs";
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
 * that page is loading when user cick up on aht button
 */
function ButtonSettingChanel() {
  const user = useContext(MyGlobalContext);

  return (
    <span
      className="setting-chanel"
      onClick={() => {
        if (user)
          user.theDispatch({
            type: e_actionType.SET_CHANEL,
            payload: AddNewChanel,
          });
      }}
    >
      <AiOutlineSetting size={60} color="rgb(93, 173, 226 )" />
    </span>
  );
}

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
  let tmp = document.getElementById(name_chanel);
  console.log(" name_chanel :", name_chanel);
  if (tmp) {
    index = tab.findIndex((element: t_chanel) => element.name === name_chanel);
  }
  return index;
}

function PrintChanel() {
  const { chanel } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { ActionCreatorMsgChanel } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const { message } = useSelector((state: RootState) => state);
  return (
    <>
      <ButtonChanel /> <br></br>
      {chanel.map((item: t_chanel, index: number) => (
        <div
          id={item.name}
          onClick={(e) => {
            let index = getIndexChanel(chanel, item.name);
            ActionCreatorMsgChanel({ ...chanel[index] });
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

type ListUser = {
  userList: {}[];
};

/**
 *  print user online
 * @param props it a array of user online
 * @returns jsx
 */
function TypeUser({ userList }: ListUser) {
  return (
    <div>
      <BsPeopleFill size={50} color="rgb(59, 163, 76)" />
      {userList.map((item: any, index: number) => (
        <div className="user-name" key={index}>
          <img className="user-icone " src={item.image} alt={item.name} />
          {item.name}
        </div>
      ))}
    </div>
  );
}

type Props = {
  list: {}[];
  type: string;
};

/**
 * take a array then call a component in depent of type
 * type can be equal to 'user' or 'chanel'
 * @param props list of user or chanel
 * @returns display that list received in param
 */
export function PrintList({ list, type }: Props) {
  return (
    <div className="user-list">
      {type === "user" ? <TypeUser userList={list} /> : <PrintChanel />}
    </div>
  );
}
