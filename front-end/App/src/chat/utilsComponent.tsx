import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

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
