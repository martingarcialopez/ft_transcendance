type T_props = {
  title: string;
};

export function TitleOptionRoom(props: T_props) {
  return <h3 className="TitleOptionRoom">{props.title}</h3>;
}
