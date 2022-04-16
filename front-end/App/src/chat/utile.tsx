import React from "react";
import "./style.css";
import { BsPeopleFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { AddNewChanel } from "./settingChanel";
import { useContext, useRef } from "react";
import { MyGlobalContext } from "./index";
import { e_actionType, t_chanel } from "./type";
import { TextField } from "./conversation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { bindActionCreators } from "redux";
import * as actionCreators from "./redux/actionCreator";

/**
 * display list of chanel
 * @param props array of chanel
 * @returns jsx
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

function PrintChanel() {
  const { chanel } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { ActionCreatorRecipient, ActionCreatorMsgSetMembers } =
    bindActionCreators(actionCreators, dispatch);
  const { message } = useSelector((state: RootState) => state);
  console.log("message : ", message);
  const refInput = useRef(null);
  return (
    <>
      <ButtonChanel /> <br></br>
      {chanel.map((item: t_chanel, index: number) => (
        <div
          onClick={(e) => {
            //console.log('hello')
            //  ActionCreatorRecipient(e.target.id)
            // let index:number = chanel.findIndex((element:t_chanel) => element.name === e.target.id)
            // ActionCreatorMsgSetMembers([...chanel[index].members])
          }}
          className="user-name chanel-name"
          id={item.name}
          key={index}
          ref={refInput}
        >
          {" "}
          {item.name}{" "}
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
