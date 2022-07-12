import { T_Room, T_Participant } from "../type/chat";

/**
 * this function filter room depend @userId
 * create a array where @userId it is admin
 * item.owner: this array contain all id user
 */
export function FilterAdmin(room: T_Room[], userId: number): T_Room[] {
  return room.filter((item: T_Room) => item.owner.includes(userId));
}

/**
 * filter type room
 * create new array room to type of @ typeOfRoom
 * @typeOfRoom === "proctected" so the function will return room array of proctect room
 * @typeOfRoom === "public" so the function will return room array of public room
 * @typeOfRoom === "privated" so the function will return room array of public room
 * @return return new array room
 */
export function FilterType(room: T_Room[], typeOfRoom: string): T_Room[] {
  return room.filter((item: T_Room) => item.typeRoom === typeOfRoom);
}

/**
 * @state == true, it meant check if user if participant
 * @state == true return false if user is participant
 * @return return the reverse of parameter state
 */
function IsParticipant(tab: T_Participant[], userId: number, state: boolean) {
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].userId === userId) {
      return state;
    }
  }
  return state ? false : true;
}

/**
 * this function return a new array
 * this array can be eihter  array where user is participant
 * this array can be eihter  array where user is not participant
 * if @state == true, filter the room where user is participant
 * if @state == false, filter the room where user is not participant
 * @return new array which contain room
 */
export function FilterParticipant(
  room: T_Room[],
  userId: number,
  state: boolean
): T_Room[] {
  return room.filter((item: T_Room) =>
    IsParticipant(item.participants, userId, state)
  );
}
