type T_props = {
  title: string;
};

export function TitleOptionRoom(props: T_props) {
  return <h3 className="TitleOptionRoom">{props.title}</h3>;
}

export function TitleModal(props: T_props) {
  return <h4 className="TitleModal">{props.title}</h4>;
}
