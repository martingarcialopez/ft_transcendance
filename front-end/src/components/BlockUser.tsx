import { useForm } from "react-hook-form";
import { TitleOptionRoom } from "./TitleOptionRoom";
import "../styles/room.css";

export function BlockUSer() {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <TitleOptionRoom title="Block USer" />
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          console.log("data:", data);
        })}
      >
        <input
          className="inputRoom"
          type="text"
          placeholder="user name"
          required
          autoComplete="on"
          {...register("name")}
        />
        <br />
        <input type="submit" className="btn-new-room" value="New" />
      </form>
    </>
  );
}
