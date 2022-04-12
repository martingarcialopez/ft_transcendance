import { Dispatch } from "redux"
import {t_chanel, e_actionChanel, t_ActionChanel} from "../type"

export const ActionCreatorChanelAdd = (amount: t_chanel) => {
    return (dispatch: Dispatch<t_ActionChanel>) => {
        dispatch({
            type: e_actionChanel.ADD,
            payload: amount
        })
    }
}
