import "./style/settingUser.css";
/* import { TitlePage } from "./utilsComponent"; */

import { userList } from "./data";
import { BsPersonPlusFill } from "react-icons/bs";

function ButtonAddOrRemoveUser() {
  return (
    <>
      <BsPersonPlusFill className="btnAddorRemoveUser" />
    </>
  );
}

/**
 *  print user online
 * @param props it a array of user online
 * @returns jsx
 */
function UserList() {
  return (
    <ul>
      {userList.map((item: any, index: number) => (
        <li className="user-name" key={index}>
          {item.name}
          <ButtonAddOrRemoveUser />
        </li>
      ))}
    </ul>
  );
}

export function SettingUser() {
  return (
    <>
      <UserList />
    </>
  );
}
