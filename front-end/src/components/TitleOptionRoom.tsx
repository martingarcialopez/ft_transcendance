type T_props = {
  title: string;
};

export function TitleOptionRoom(props: T_props) {
  return (
    <h3 style={{ position: "relative", left: "25%", width: "25%" }}>
      {props.title}
    </h3>
  );
}
