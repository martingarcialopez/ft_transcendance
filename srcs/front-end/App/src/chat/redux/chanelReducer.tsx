import {listChanel} from "../data"
import {t_chanel, e_actionChanel, t_ActionChanel} from "../type"

function initialState(): t_chanel[]{
	return listChanel
}

export function chanelReducer(state:t_chanel[] =initialState(), action:t_ActionChanel)
{
	switch (action.type){
		case e_actionChanel.ADD:
			return [...state, action.payload ]
		default:
			return state
	}
}