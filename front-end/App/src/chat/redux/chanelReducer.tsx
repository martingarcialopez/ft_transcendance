import {listChanel} from "../data"
import {t_chanel, e_actionType, t_ActionChanel, t_ActionMsg} from "../type"

function initialState(): t_chanel[]{
	return listChanel
}

export function chanelReducer(state:t_chanel[] =initialState(), action:t_ActionChanel)
{
	switch (action.type){
		case e_actionType.ADD:
			return [...state, action.payload ]
		default:
			return state
	}
}

type t_stateMsg=   {
	content: string[],
	from: string,
	to:string,
	members:[]
}

function initStateMsg():t_stateMsg{
	return  {
		content: [],
		from: '',
		to:'',
		members : []
	}
}

/**
 * define the propriety of message(from, to, content)
 * @param state 
 * @param action 
 * @returns 
 */
export function msgReducer(state:t_stateMsg=initStateMsg(), action:t_ActionMsg)
{
	switch (action.type){
		case e_actionType.NEW_MSG:{
			return {...state, content:action.payload }
		}
		case e_actionType.RECIPIENT:{
			return {...state, to:action.payload }
		}
		case e_actionType.MEMBERS:{
			return {...state, members:action.payload }
		}
		default:
			return state
	}
}