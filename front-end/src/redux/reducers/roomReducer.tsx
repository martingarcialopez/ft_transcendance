import { T_Room, T_Action } from "../../type/chat";
import { E_ActionType } from "../../type/Enum";

let arrayRoom: T_Room[] = [
  {
    name: "LIVERPOOL",
    id: 1, //this id i creat myself
    typeRoom: "public",
    password: "",
    owner: [],
    participants: [],
    avatar: "https://avatars.dicebear.com/api/adventurer/KEISHA.svg",
  },
  {
    name: "REAL",
    id: 3,
    typeRoom: "protected",
    password: "",
    owner: [],
    participants: [],
    avatar: "https://avatars.dicebear.com/api/human/:LENOX.svg",
  },
];

export function roomReducer(state: T_Room[] = arrayRoom, action: T_Action) {
  switch (action.type) {
    case E_ActionType.ADD_NEW_ROOM: {
      return [...state, action.payload];
    }
    case E_ActionType.INIT_ROOM_ARRAY: {
      return action.payload;
    }

    default:
      return state;
  }
}
