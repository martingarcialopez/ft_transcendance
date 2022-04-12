

export type t_chanel={
	name: string,
	type: string,
	password: string,
	owner:string,
	members:[]
}

export type t_state = { 
	theDispatch: Function,
	theState:any
}

export type Action =   {
	type: string,
	payload: Function
}


export enum ActionType {
    SET_CHANEL = "setting-chanel",
    TEXT_FIELD = "text Filed"
}


export enum e_actionChanel {
	ADD = "add new chanel",
    TEXT_FIELD = "text Filed"
}


export type t_ActionChanel =   {
	type: string,
	payload: t_chanel
}
