import React from "react";
import "./style.css"
import { BsPeopleFill } from "react-icons/bs";
import { IoIosPeople } from  "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import {AddNewChanel} from "./settingChanel"
import {useContext } from "react";
import {MyGlobalContext} from "./index"
import {ActionType} from './type'
import {TextField} from './conversation'
import { useSelector } from "react-redux";
import {RootState } from './redux/store';

/**
 * display list of chanel
 * @param props array of chanel
 * @returns jsx
 */

function ButtonSettingChanel()
{
	const user = useContext(MyGlobalContext);

	return (
		<span className="setting-chanel" onClick={()=> {if (user) user.theDispatch({type: ActionType.SET_CHANEL, payload:AddNewChanel})	}} >
		<AiOutlineSetting  size={60} color="rgb(93, 173, 226 )" />
		</span>
	)
}

function ButtonChanel()
{
	const user = useContext(MyGlobalContext);

	return (
		
		<span className="icon-chanel" onClick={()=> {if (user) user.theDispatch({type: ActionType.TEXT_FIELD, payload:TextField})	}}  >
				 <IoIosPeople size={60} color="rgb(240, 128, 128)" />
		</span>
	)
}

function PrintChanel()
{
	const state = useSelector((state: RootState) => state)

	return (
		<>
			<ButtonChanel/>
				 <br></br>
			 {state.chanel.map((item:any) => <div className="user-name chanel-name"  key={item.name}> {item.name} </div>)}
			<ButtonSettingChanel/>
		</>
	)
}

type ListUser = {
	userList: {}[],
  }

/**
 *  print user online
 * @param props it a array of user online
 * @returns jsx
 */
function TypeUser({userList}:ListUser)
{
	return (
		<div>
			<BsPeopleFill size={50} color="rgb(59, 163, 76)" />
			{
				userList.map((item:any) => 
				<div className="user-name"  key={item.name}> 
					<img  className="user-icone "  src={item.image} alt={item.name} />{item.name} 
				</div>) 
			}
		</div>
	)
}

type Props = {
	list: {}[],
	type:string
  };

/**
 * take a array then call a component in depent of type
 * type can be equal to 'user' or 'chanel' 
 * @param props list of user or chanel
 * @returns display that list received in param
 */
export function PrintList({list, type}:Props)
{
		return (
			<div className="user-list">
				
				{type === 'user' ? <TypeUser userList={list}/>	: <PrintChanel  />}	

			</div>
		)
}
