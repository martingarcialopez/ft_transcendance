import { T_Room, T_Action } from "../../type/chat";
import { E_ActionType } from "../../type/Enum";

let arrayRoom: T_Room[] = [
  {
    name: "LIVERPOOL",
    id: 0,
    typeRoom: "public",
    password: "",
    owner: [],
    members: [],
    avatar: "https://avatars.dicebear.com/api/adventurer/KEISHA.svg",
  },
  {
    name: "REAL",
    id: 1,
    typeRoom: "public",
    password: "",
    owner: [],
    members: [],
    avatar: "https://avatars.dicebear.com/api/human/:LENOX.svg",
  },
  {
    name: "PSG",
    id: 2,
    typeRoom: "privat",
    password: "",
    owner: [],
    members: [],
    avatar: "https://avatars.dicebear.com/api/adventurer/PSG.svg",
  },
  {
    name: "CITY",
    id: 3,
    typeRoom: "public",
    password: "",
    owner: [],
    members: [],
    avatar: "https://avatars.dicebear.com/api/adventurer/city.svg",
  },
];

export function roomReducer(state: T_Room[] = arrayRoom, action: T_Action) {
  switch (action.type) {
    case E_ActionType.ADD_NEW_ROOM: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
