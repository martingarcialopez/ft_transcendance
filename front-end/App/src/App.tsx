
import React from "react";
// import { useForm} from 'react-hook-form';
// import { useState } from "react";
// import socketio from "socket.io-client";
import LayoutChat from './chat'

// const ENDPOINT = "http://localhost:3000"


// const App = () => {
// 	const { register, handleSubmit } = useForm();
// 	const [array, setArray] = useState(():string[]=> { return []});

// 	const socket = socketio(ENDPOINT,  {	transports: ["websocket"]});
// 	console.log(typeof (socket.id))
// 	// socket.on(("connect", (void) { console.log(socket.id); 	  });
// 	socket.on('connect', () => {console.log("id  = ",socket.id)	})
// 	function send(data: any):void{
// 		socket.on('msgToClient', (message:any) => {
// 			console.log("reponse = ", message)
// 			setArray( arr => [...array, message])

// 		})
// 		socket.emit('msgToServer', data.fullname)
// 	}
// 	return (
// 		<div>
// 			{/* <form name="myForm"  action="" method="get"  onSubmit={handleSubmit( (data:any) =>  setArray( arr => [...array, data.fullname]) )} > */}
// 			<h2>Client</h2>
// 			<form name="myForm"  action="" method="get"  onSubmit={handleSubmit( send )} >
// 				<label >First name:</label>	<input  type="text"   {...register('fullname')} />
// 				<input type="submit"  value="Submit"  />
// 			</form>
// 			<ul>
// 				{array.map(item =>
// 				<li key={item}>{item}</li>
// 				)}
// 			</ul>
// 		</div>
//   );
// };

const App = () => {
	return (

		<div>
			<LayoutChat/>
		</div>
	)
}

export default App;
