import { bindActionCreators } from "redux";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { t_chanel } from "./type";
import "./style/settingChannel.css";
import * as actionCreators from "./redux/actionCreator";
import { TitlePage } from "./utilsComponent";
import { socket } from "./conversation";
import { BsPlusSquareFill } from "react-icons/bs";

function updateArrayChanel(data: any): t_chanel {
  let newChanel: t_chanel = {
    name: data.name,
    id: 0,
    type: data.type,
    password: data.password,
    owner: "string",
    members: [],
  };
  return newChanel;
}

/*
 * display all chanel with option to join it or leave it
 */
function JoinOrLeave() {
  const { chanel } = useSelector((state: RootState) => state);
  return (
    <>
      <ul>
        {chanel.map((item: t_chanel, index: number) => (
          <li key={index}>
            {item.name}
            <button className="btn-join-channel btn-leave-channel">
              <BsPlusSquareFill />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * this function avoid dupliction of chanel name
 * check if the name of newchanel is already in list of chanel
 * @param listOfChanel array of room (chanel)
 * @param newChanel
 * @returns
 */
/* function isDoublon(listOfChanel: t_chanel[], newChanel: t_chanel): boolean {
 *   let hasExisting: boolean = listOfChanel.some(
 *     (item) => item.name === newChanel.name
 *   );
 *   return hasExisting;
 * }
 *  */

/**
 *@newChannel  have to be a id, this going to setup the id of this channel
 * the id come from the nestJs container
 *return the id of channel to coming to create
 *
 */
function GetIdChannel(newChannel: t_chanel): number {
  let id: number = -1;
  socket.on("idRoom", (receive: { id: number; name: string }) => {
    /* console.log("reponse after creation channel  = ", receive); */
    newChannel.id = receive.id;
    id = receive.id;
  });
  return id;
}

/**
 *  the form to add  a new chanel
 * this component print the form and send the input to the server
 * add new chanel into the store
 * @returns rend the form
 */
export function AddNewChanel() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { ActionCreatorChanelAdd } = bindActionCreators(
    actionCreators,
    dispatch
  );
  /* const state = useSelector((state: RootState) => state); */

  return (
    <>
      <TitlePage />
      <form
        className="theForm"
        onSubmit={handleSubmit((data) => {
          let newChanel = updateArrayChanel(data);
          /* if (isDoublon(state.chanel, newChanel) === false) */
          /* newChanel.id */
          socket.emit("createRoom", newChanel);
          GetIdChannel(newChanel);
          console.log("chanel created :", newChanel);
          ActionCreatorChanelAdd(newChanel);
        })}
      >
        <input
          type="text"
          placeholder="Name of new channel"
          required
          {...register("name")}
          autoComplete="on"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          required
          {...register("password")}
          autoComplete="on"
        />
        <br />
        <select id="pet-select" {...register("type")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <br />
        <input type="submit" value="New Chanel" />
      </form>
      <JoinOrLeave />
    </>
  );
}
