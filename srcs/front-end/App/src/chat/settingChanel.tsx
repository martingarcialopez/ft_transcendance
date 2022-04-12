
import { bindActionCreators } from 'redux';
import { useForm} from 'react-hook-form';
import {ActionCreatorChanelAdd} from "./redux/actionCreator"
import {useDispatch,  useSelector } from "react-redux";
import {RootState} from "./redux/store"
import {t_chanel} from './type'
import React from "react";
import "./style.css"


function updateArrayChanel(data:any):t_chanel{
	let newChanel:t_chanel = {
		name: data.name,
		type: data.type,
		password: data.password,
		owner:"string",
		members:[]
	}
	return newChanel
}


/**
 * this function avoid dupliction of chanel name
 * check if the name of newchanel is already in list of chanel
 * @param listOfChanel array of room (chanel)
 * @param newChanel
 * @returns 
 */
function isDoublon(listOfChanel: t_chanel[], newChanel:t_chanel): boolean
{
	let hasExisting:boolean = listOfChanel.some(item => item.name === newChanel.name)
	return 	hasExisting
}

/**
 * add new chanel into the store
 * @returns rend the form 
 */
export  function AddNewChanel()
{
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const add = bindActionCreators(ActionCreatorChanelAdd, dispatch)
	const state = useSelector((state: RootState) => state)
	return (
		<>
		<p>setting chanel</p>
		<form className="theForm" onSubmit={handleSubmit( data=>{ let newChanel = updateArrayChanel(data); if (isDoublon(state.chanel, newChanel) === false) add(newChanel) } )} >
			<input type="text" placeholder="Add new chanel" required  {...register('name') } autoComplete="on" /><br/>
			<input type="password" placeholder="password" required  {...register('password') } autoComplete="on" /><br/>
				<select id="pet-select" {...register('type') }>
					<option value="public">Public</option>
					<option value="private">Private</option>
				</select><br/>
			<input type="submit"  value="New Chanel"  />
		</form>
	</>
	)
}