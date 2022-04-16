

export type t_chanel={
	name: string,
	type: string,
	password: string,
	owner:string,
	members:string[]
}


export enum e_actionType {
    SET_CHANEL = "setting-chanel",
    TEXT_FIELD = "text Filed",
	ADD = "add new chanel",
	NEW_MSG = "new msg arrived",
	RECIPIENT = "define the recipient of message",
	MEMBERS = "set the members of chanel"
}


export type t_ActionChanel =   {
	type: string,
	payload: t_chanel
}



export type t_ActionMsg =   {
	type: string,
	payload: any
}
