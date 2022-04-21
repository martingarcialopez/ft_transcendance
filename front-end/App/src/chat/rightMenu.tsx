//import React from "react";
import "./style.css";
import { BsPeopleFill } from "react-icons/bs";
import { userList } from "./data";

/**
 *  print user online
 * @param props it a array of user online
 * @returns jsx
 */
export function PrintUserList() {
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
