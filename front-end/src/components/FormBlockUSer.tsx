import { useForm } from "react-hook-form";
import { E_BlockUser } from "../components/Event";
import "../styles/room.css";

export function BlockUser() {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <br />
      <br />
      <h3 style={{ position: "relative", left: "25%" }}>Block USer</h3>
      <form
        className="frm-add-room"
        onSubmit={handleSubmit((data) => {
          console.log("data:", data);
          E_BlockUser(3, 29);
        })}
      >
        <input
          className="inputRoom"
          type="text"
          placeholder="Name User to block"
          required
          autoComplete="on"
          {...register("name")}
        />
        <br />
        <input type="submit" className="btn-new-room" value="Block" />
      </form>
    </>
  );
}
