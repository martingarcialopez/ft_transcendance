import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { t_channel } from "./type";

export function TitlePage() {
  /*
			this Component print the Title of the middle page
		*/
  const { info } = useSelector((state: RootState) => state);
  return (
    <>
      <h3 className="title-page">{info.titleOfPage}</h3>
    </>
  );
}
/*
 * export function ChangePage(page: any) {
 *   const user = useContext(MyGlobalContext);
 *
 *   alert("hello");
 * 	if (user)
 * 		user.theDispatch({
 * 			type: e_actionType.TEXT_FIELD,
 * 			payload: page,
 * 		});
 * 	return <>{console.log("page:", page)}</>;
 * } */

export function CreateChannelObject(
  arrayChannel: t_channel[],
  occurence: { id: number; name: string; contentMsg: string }
) {
  const newChannel = arrayChannel.map((item) => {
    if (item.id === occurence.id) {
      item.message = [
        ...item.message,
        { user: "inconu", content: occurence.contentMsg },
      ];
    }
  });
  return newChannel;
}
