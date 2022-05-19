import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {v4 as uuidv4} from 'uuid';
import { Socket } from 'socket.io'

import { Matchmaking } from '../models/matchmaking.entity';
import { PongDto } from '../dtos/in/pong.dto';
import { moveDto } from 'src/dtos/in/move.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { GameEntity } from '../models/game.entity';

@Injectable()
export class PongService {
	/*if needed*/
	//	@Inject(UserService)
	//  private readonly userService: UserService;
	constructor(
		@InjectRepository(Matchmaking) private readonly pongRepository: Repository<Matchmaking>,
		private readonly gameService: InMemoryDBService<GameEntity>
	) { }

	//----------------------Matchmaking------------------------
	/*check the player is already exist or not*/


    // async managePlayer(socket: Socket, userId : number) :Promise<void> {

	// 	let myuuid = uuidv4();

	// 	// CHECK IF AT LEAST A PLAYER IS ALSO WAITING FOR A GAME
	// 	// AND IF SO LOCK HIM
	// 	let res = await this.pongRepository
	// 		.createQueryBuilder()
	// 		.update(Matchmaking)
    //         .set({ lock:myuuid })
	// 		.where("id in (select id from matchmaking where lock is null limit 1)")
	// 		.execute();

	// 	// IF NO PLAYER WAITING, WE ADD CURRENT ONE
	// 	if (res.affected == 0){
	// 		const new_matchmaking = new Matchmaking();
	// 		new_matchmaking.userId = userId;
	// 		new_matchmaking.roomName = myuuid;
	// 		await this.pongRepository.save(new_matchmaking);
	// 		socket.join(myuuid);
	// 		socket.to(socket.id).emit('GameInfo', 'leftPlayer', myuuid);
	// 		console.log(`first player arrived and joined room ${myuuid}`);
	// 	}
	// 	else
	// 	{
	// 		// GET INFOS FROM LOCKED PLAYER
	// 		let user_infos = await this.pongRepository
	// 			.createQueryBuilder('matchmaking')
	// 			.select(['matchmaking.userId', 'matchmaking.roomName'])
	// 			.where("matchmaking.lock = :lock", { lock: myuuid })
	// 			.execute();
	// 		let other_user_id = user_infos[0].matchmaking_userId;
	// 		let roomName = user_infos[0].matchmaking_roomName;

	// 		// DELETE LOCKED PLAYER
	// 		await this.pongRepository
	// 			.createQueryBuilder('matchmaking')
	// 			.delete()
	// 			.where("matchmaking.lock = :lock", { lock: myuuid })
	// 			.execute();

	// 		socket.join(roomName);
	// 		socket.to(socket.id).emit('GameInfo', 'rightPlayer', roomName);
	// 		console.log(`second player arrived and joined room ${roomName}`);
	// 		this.playGame(socket, roomName);
	// 		console.log('GAME STARTED');
	// 	}
    // }

	async managePlayer(socket: Socket, userId : number) :Promise<void> {

		let bbdd = await this.pongRepository.find();
		
		if (!bbdd.length) {

			const player: Matchmaking = new Matchmaking();

			player.userId = userId;
			player.roomName = uuidv4();
			await this.pongRepository.save(player);

			socket.emit('GameInfo', 'leftPlayer', player.roomName);
			socket.join(player.roomName);
			console.log(`first player arrived and joined room ${player.roomName}`);

		} else {

			let opponent: Matchmaking = bbdd.at(0);
			this.pongRepository.delete( { userId: opponent.userId });

			socket.emit('GameInfo', 'rightPlayer', opponent.roomName);
			socket.join(opponent.roomName);
			this.playGame(socket, opponent.roomName);
			console.log(`second player arrived and joined room ${opponent.roomName}`);
			console.log(`GAME STARTED in room ${opponent.roomName}`);	

		}
	}

	async playGame(socket: Socket, socketRoom: string) {

		console.log(`playGame :.>.>: GAME STARTED IN ROOM ${socketRoom}`);

		let state: State = initGameState();
		let lastMove: number = 0;
		let winner: string;

		let paddleSpeed = 10;

		 while (true) {

			if (state.leftScore >= 3 || state.rightScore >= 3) {

				if (state.leftScore >= 3)
					winner = 'leftplayer';
				else if (state.rightScore >= 3)
					winner = 'rightplayer';
				socket.to(socketRoom).emit('gameOver', winner);
				return ;
			}

			// const move : GameEntity[] = this.gameService.query((record) => record.room === socketRoom);
			const move : GameEntity[] = this.gameService.getAll();

			console.log(move);

			let leftPlayerMove = 0;
			let rightPlayerMove = 0;

			if (move.length > lastMove) {

				for (let i: number = lastMove; i < move.length ; i++) {
					if (move[i].player === "leftPlayer")
						leftPlayerMove += move[i].move;
					else if (move[i].player === "rightPlayer")
						rightPlayerMove += move[i].move;
				}
			}
			lastMove = move.length;

			const prevTotalScore: number = state.leftScore + state.rightScore;

			state = nextState(state, leftPlayerMove * paddleSpeed, rightPlayerMove * paddleSpeed);

			socket.emit('gameState', state);
			socket.to(socketRoom).emit('gameState', state);

			// console.log(state);

			if (prevTotalScore != state.leftScore + state.rightScore)
				await sleep(400);
			else
				await sleep(40); // sleep in ms

		 }
	}

	async registerMove(move: GameEntity): Promise<void> {

		// console.log(move);

		const created: GameEntity = this.gameService.create({
			id: move[0],
			room: move[1],
			player: move[2],
			move: move[3]
		});
		// console.log('from register move, created entity is');
		// console.log(created);
	}
}






function initGameState(): State {

	return new State(
		{
			ballPos: new Point(board_x_size / 2, board_y_size / 2),
			ballVel: new Point(initial_velocity, Math.floor(Math.random() * (initial_velocity + 1))),
			leftPaddle: board_y_size / 2,
			rightPaddle: board_y_size / 2,
			leftScore: 0,
			rightScore: 0
		}
	);
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var board_x_size: number = 600;
var board_y_size: number = 300;
var paddle_size: number = 70;
var paddle_width: number = 20;
var ball_radius: number = 10;

var initial_velocity: number = 10;

class Point {

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	x: number;
	y: number;

	add(p: Point) {
		this.x += p.x;
		this.y += p.y;
	}
}

class State {

	constructor(data: Partial<State> = {}) {
		Object.assign(this, data)
	}

	ballPos: Point; // ball position
	ballVel: Point; // ball velocity
	leftPaddle: number; // left paddle position (only y component, we know leftPaddle.x will be 0)
	rightPaddle: number; // right paddle position (only y component, we know rightPaddle.x will be board_x_size)
	leftScore: number;
	rightScore: number;
}

// Paddle Position will represent the center of the paddle on the y axis, regardless of its size

function updatePaddlePosition(next: State, leftPlayerMove: number, rightPlayerMove: number) {

	next.leftPaddle += leftPlayerMove; // the position of the paddle after left player move is applied
	if (next.leftPaddle + paddle_size / 2 >= board_y_size) // if paddle exits canvas (lower end), block it at the bottom
		next.leftPaddle = board_y_size - paddle_size / 2;
	else if (next.leftPaddle - paddle_size / 2 <= 0) // if paddle exits canvas (higher end), block it at the top
		next.leftPaddle = paddle_size / 2;

	next.rightPaddle += rightPlayerMove;
	if (next.rightPaddle + paddle_size / 2 >= board_y_size)
		next.rightPaddle = board_y_size - paddle_size / 2;
	else if (next.rightPaddle - paddle_size / 2 <= 0)
		next.rightPaddle = paddle_size / 2;

}

function updateBallPosition(current: State, next: State) {

	// calculate next ball position adding current position with current velocity (friction is not yet taken into account)
	next.ballPos.add(current.ballVel);

	if (next.ballPos.y + ball_radius >= board_y_size) { // if ball touches lower edge, make it bounce
		next.ballPos.y = board_y_size - ball_radius; // keep ball inside the canvas (ball radius not taken into account yet)
		next.ballVel.y = -current.ballVel.y; // change the y velocity component, so next turn will rebound in opposite direction
	}
	else if (next.ballPos.y - ball_radius <= 0) { // same calculations if ball touches higher edge
		next.ballPos.y = ball_radius;
		next.ballVel.y = -current.ballVel.y;
	}

	if (next.ballPos.x - ball_radius <= paddle_width + 2) { // Could be a Goal or a Rebound (Paddle width not taken into account yet)

		if (Math.abs(next.ballPos.y - next.leftPaddle) <= paddle_size / 2) { // if rebounds on paddle

			next.ballPos.x = paddle_width + ball_radius; // keep the ball touching the paddle
			next.ballVel.x = -current.ballVel.x; // change the x velocity component, so next turn will rebound in opposite direction
//			if (next.ballVel.y === 0)
//				next.ballVel.x = Math.abs(next.ballPos.y - next.leftPaddle);

		} else if (next.ballPos.x <= 0) { // If there were no paddle to stop it >> There is a Goal

			// rightPlayer scores a point
			next.rightScore += 1;
			// Ball spawns close to the center but closer to player that have just scored
			next.ballPos.x = board_x_size / 2 + 50;
			next.ballPos.y = board_y_size / 2;
			// Ball also heads in the direction of player that have just scored
			next.ballVel.x = initial_velocity;
			// We randomize y component so that the ball will not move on a straight line
			next.ballVel.y = Math.floor(Math.random() * (initial_velocity + 1));
		}
	}
	else if (next.ballPos.x + ball_radius >= (board_x_size - paddle_width - 2)) { // exact same calculations on the other field

		if (Math.abs(next.ballPos.y - next.rightPaddle) <= paddle_size / 2) {

			next.ballPos.x = board_x_size - paddle_width - ball_radius;
			next.ballVel.x = -current.ballVel.x;

		} else if (next.ballPos.x >= board_x_size) {

			next.leftScore += 1;
			next.ballPos.x = board_x_size / 2;
			next.ballPos.y = board_y_size / 2;
			next.ballVel.x = -initial_velocity;
			next.ballVel.y = Math.floor(Math.random() * (initial_velocity + 1));
		}
	}
}

function nextState(current: State, leftPlayerMove: number, rightPlayerMove: number): State {

	let next = new State(current);

	updatePaddlePosition(next, leftPlayerMove, rightPlayerMove);
	updateBallPosition(current, next);

	return next;
}
