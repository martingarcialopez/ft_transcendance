import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, VersionColumn } from 'typeorm';

import {v4 as uuidv4} from 'uuid';
import { Socket, Server } from 'socket.io'

import { Matchmaking } from '../models/matchmaking.entity';
import { PongDto } from '../dtos/in/pong.dto';
import { moveDto } from 'src/dtos/in/move.dto';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { GameEntity } from '../models/game.entity';
import { UserService } from './user.service';
import { GameHistory } from 'src/models/gamehistory.entity';
import { User } from 'src/models/user.entity';
import * as typeorm from "typeorm";

var board_x_size: number = 600;
var board_y_size: number = 300;
var paddle_size: number = 70;
var paddle_width: number = 20;
var ball_radius: number = 10;

@Injectable()
export class PongService {
	/*if needed*/
	//	@Inject(UserService)
	//  private readonly userService: UserService;
	constructor(
		@InjectRepository(Matchmaking) private readonly pongRepository: Repository<Matchmaking>,
		@InjectRepository(GameHistory) private gameHistoryRepository: Repository<GameHistory>,
		@InjectRepository(User) private userRepository: Repository<User>,
		private readonly gameService: InMemoryDBService<GameEntity>,
		private readonly userService: UserService
	) { }

	async setSocketId(client: Socket, username: string) : Promise<string> {

		const user: User = await this.userService.getUser(username);
		if (!user)
			throw new NotFoundException();

		const updatedUser = await this.userService.updateUser( { socketId: client.id}, user.id.toString())	

		const game: GameHistory = await this.gameHistoryRepository.findOne(
			{ 
				where: [ 
					{ winner: typeorm.IsNull(), leftPlayer: username },
					{ winner: typeorm.IsNull(), rightPlayer: username}
				],
				order: { id: 'DESC' }
			});
		
		if (game) {
			client.join(game.roomId);
			console.log(`user joined room ${game.roomId}`);
		}

		console.log(`user ${username} got socket id ${client.id}`);

		return updatedUser.socketId;
	}


	async handleDisconnect(client: Socket) {

		let user: User = await this.userRepository.findOne( { socketId: client.id } );
		if (!user)
			return;
		user = await this.userService.updateUser( { socketId: null }, user.id.toString());

		this.pongRepository.delete({ userId: user.id });

		// await new Promise(r => setTimeout(r, 5000));

		// user = await this.userService.getUser(user.username);
		// if (user && user.socketId) {

		// 	const game: GameHistory = await this.gameHistoryRepository.findOne({ 
		// 		where: [ 
		// 			{ winner: typeorm.IsNull(), leftPlayer: user.username },
		// 			{ winner: typeorm.IsNull(), rightPlayer: user.username}
		// 		],
		// 		order: { id: 'DESC' }
		// 	});

		// 	class Game implements GameEntity {

		// 		id: string;
		// 		move: number;
		// 		player: string;
		// 		room: string;
		// 	}

		// 	let move: Game = new Game();

		// 	move.id = uuidv4();
		// 	move.move = 0;
		// 	move.player = game.leftPlayer === user.username ? 'rightPlayer' : 'leftPlayer';
		// 	move.room = game.roomId;

		// 	this.registerMove(move);

		// } // give up game - destroy custom game room ?


	}

	async iDontWannaPlayAnymore(client: Socket, userId: number) {
		
		this.pongRepository.delete( { userId: userId } );

	}

	async managePlayer(socket: Socket, server: Server, userId : number, difficulty: string, maxScore: number) :Promise<void> {

		let existingGame: Matchmaking = await this.pongRepository.findOne ( { userId: userId } );
		if (existingGame)
			await this.pongRepository.delete( { userId: userId } );

		let bbdd = await this.pongRepository.find( { "difficulty": difficulty, "winningScore": maxScore} );

		if (!bbdd.length) {

			const player: Matchmaking = new Matchmaking();

			player.userId = userId;
			player.difficulty = difficulty;
			player.winningScore = maxScore;
			player.roomName = uuidv4();
			await this.pongRepository.save(player);


			socket.join(player.roomName);

		} else {

			let opponent: Matchmaking = bbdd.at(0);
			this.pongRepository.delete( { userId: opponent.userId });

			socket.join(opponent.roomName);
			server.to(socket.id).emit('GameInfo', 'rightPlayer');

			const gameResult: GameHistory = new GameHistory();

			gameResult.roomId = opponent.roomName;
			gameResult.difficulty = difficulty;
			gameResult.maxScore = maxScore;
			gameResult.leftPlayer = (await this.userService.getUserById(opponent.userId.toString())).username;
			gameResult.rightPlayer = (await this.userService.getUserById(userId.toString())).username;

			this.gameHistoryRepository.save(gameResult);

			server.to(opponent.roomName).emit("GamePlayersName", gameResult.leftPlayer, gameResult.rightPlayer);

			let updatedUser = await this.userService.updateUser( { status: opponent.roomName }, opponent.userId.toString());
			updatedUser = await this.userService.updateUser( { status: opponent.roomName }, userId.toString());
			
			this.playGame(server, opponent.roomName, difficulty, opponent.userId, userId, maxScore);
		}
	}

	async createCustomGame(userId: string, difficulty: string, maxScore: number) : Promise<string> {

		// const user: User = await this.userService.getUserById(userId);
		// if (!user)
		// 	throw new NotFoundException();

		const game: GameHistory = new GameHistory();

		game.roomId = uuidv4();
		game.difficulty = difficulty;
		game.maxScore = maxScore;
		// game.leftPlayer = user.username;

		await this.gameHistoryRepository.save(game);

		return game.id;

	}

	async joinPongRoom(client: Socket, server: Server, userId: string, roomId: string) {

		// console.log ('IN JOIN PONG ROOM BEBEEEEEE');

		// await new Promise(r => setTimeout(r, 10));

		const room = server.sockets.adapter.rooms.get(roomId);
		const roomSize: number = room ? room.size : 0;

		let game: GameHistory = await this.gameHistoryRepository.findOne( { where: { roomId: roomId } } );

		if (game && game.winner) {

			console.log('someone arrived to a finished game !')

			let state: State = initGameState('normal', game.leftPlayer, game.rightPlayer, roomId);
			// client.emit('gameState', state);
			client.emit('gameOver', game.winner === game.leftPlayer ? 'leftPlayer' : 'rightPlayer', game.winner === game.leftPlayer ? game.leftPlayer : game.rightPlayer);
			return ;
		}

		if (!game) {
			game = new GameHistory();

			game.roomId = roomId;
			game.difficulty = 'normal';
			game.maxScore = 5;

			// console.log('player 1 arrived !')

			const firstPlayer: User = await this.userService.getUserById(userId);
			if (!firstPlayer)
				throw new NotFoundException();

			game.leftPlayer = firstPlayer.username;

			await this.gameHistoryRepository.save(game);

			client.join(roomId);

			let state: State = initGameState('normal', firstPlayer.username, 'waiting for the opponent to join the room ...', roomId);

			client.emit('gameState', state);
		}

		else if (game.rightPlayer) {

			client.join(roomId);
			console.log(`joining espectator to the socket room ${roomId}`);

		} else {

			// console.log('player 2 arrived !')

			let game: GameHistory = await this.gameHistoryRepository.findOne( { where: { roomId: roomId } } );

			const firstPlayer: User = await this.userService.getUser(game.leftPlayer);
			if (!firstPlayer)
				throw new NotFoundException();

			const secondPlayer: User = await this.userService.getUserById(userId);
			if (!secondPlayer)
				throw new NotFoundException();

			if (game.leftPlayer === secondPlayer.username) {

				let state: State = initGameState('normal', firstPlayer.username, 'waiting for the opponent to join the room ...', roomId);

				client.join(roomId);
				client.emit('gameState', state);
				return;
			}
			game.rightPlayer = secondPlayer.username;
			this.gameHistoryRepository.save(game);

			let updatedUser = await this.userService.updateUser( { status: game.id }, firstPlayer.id.toString());
			updatedUser = await this.userService.updateUser( { status: game.id }, secondPlayer.id.toString());
			
			client.join(roomId);
			this.playGame(server, game.roomId, game.difficulty, firstPlayer.id, secondPlayer.id, game.maxScore);
		}
	}


	async playGame(socket: Server, socketRoom: string, difficulty: string, player1Id: number, player2Id: number, winningScore: number) {

		console.log(`playGame :.>.>: GAME STARTED IN ROOM ${socketRoom}`);

		const user1: User = await this.userService.getUserById(player1Id.toString());
		const user2: User = await this.userService.getUserById(player2Id.toString());
		if (!user1 || !user2)
			throw new NotFoundException();

		let state: State = initGameState(difficulty, user1.username, user2.username, socketRoom);
		let lastMove: number = 0;
		let winner: string;

		let paddleSpeed = 10;

		 while (true) {

			if (state.playerGiveUp || state.leftScore >= winningScore || state.rightScore >= winningScore) {

				if (state.playerGiveUp === 'rightPlayer' || state.leftScore >= winningScore)
					winner = 'leftPlayer';
				else if (state.playerGiveUp === 'leftPlayer' || state.rightScore >= winningScore)
					winner = 'rightPlayer';
				console.log(`winner is ${winner}`)
				socket.to(socketRoom).emit('gameOver', winner, winner === 'leftPlayer' ? state.leftPlayer : state.rightPlayer);
				const move = this.gameService.getAll();
				move.filter(elem => elem.room === socketRoom).forEach(elem => this.gameService.delete(elem.id));

				const gameResult: GameHistory = (await this.gameHistoryRepository.find( { where : { roomId: socketRoom } } )).at(0) ;

				// Solve the error w/out Internal Server Error plz
				if (!gameResult)
					throw new InternalServerErrorException();

				gameResult.leftPlayerScore = state.leftScore;
				gameResult.rightPlayerScore = state.rightScore;
				gameResult.winner = (winner === 'rightplayer') ? gameResult.rightPlayer : gameResult.leftPlayer ;
				gameResult.losser = (winner === 'rightplayer') ? gameResult.leftPlayer : gameResult.rightPlayer ;

				console.log("saving this");
				console.log(gameResult);

				const updateResult = await this.gameHistoryRepository.save(gameResult);

				console.log('result is');
				console.log(updateResult);

				this.userService.updateUser( { status: "online" }, player1Id.toString());
				this.userService.updateUser( { status: "online" }, player2Id.toString());

				return ;
			}

			// const move : GameEntity[] = this.gameService.query((record) => record.room === socketRoom);
			const move : GameEntity[] = this.gameService.getAll();

			//console.log(move);

			let leftPlayerMove = 0;
			let rightPlayerMove = 0;

			if (move.length > lastMove) {

				for (let i: number = lastMove; i < move.length ; i++) {
					if (move[i].move  === 0)
						state.playerGiveUp = move[i].player;
					else if (move[i].player === "leftPlayer")
						leftPlayerMove += move[i].move;
					else if (move[i].player === "rightPlayer")
						rightPlayerMove += move[i].move;
				}
			}
			lastMove = move.length;

			const prevTotalScore: number = state.leftScore + state.rightScore;

			state = nextState(state, leftPlayerMove * paddleSpeed, rightPlayerMove * paddleSpeed);

			//socket.emit('gameState', state);
			socket.to(socketRoom).emit('gameState', state);

			// console.log(state);

			if (prevTotalScore != state.leftScore + state.rightScore)
				await sleep(400);
			else
				await sleep(40); // sleep in ms

		 }
	}

	async registerMove(move: GameEntity): Promise<void> {

		const created: GameEntity = this.gameService.create({ id: uuidv4(), ...move });
	}
}


function initGameState(difficulty: string, player1: string, player2: string, roomId: string): State {

	var vel: number = 10;

	if (difficulty === "Easy") {
		paddle_size = 100;
	}
	else if (difficulty === "Hard") {
		paddle_size = 40;
	}

	return new State(
		{
			canvasWidth: board_x_size,
			canvasHeight: board_y_size,
			paddleWidth: paddle_width,
			paddleHeight: paddle_size,
			ballRadius: ball_radius,
			initial_velocity: vel,
			ballPos: new Point(board_x_size / 2, board_y_size / 2),
			ballVel: new Point(vel, Math.floor(Math.random() * (vel + 1))),
			leftPaddle: board_y_size / 2,
			rightPaddle: board_y_size / 2,
			leftScore: 0,
			rightScore: 0,
			leftPlayer: player1,
			rightPlayer: player2,
			roomId: roomId,
			playerGiveUp: ""
		}
	);
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}




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

	roomId: string;
	initial_velocity: number;
	ballPos: Point; // ball position
	ballVel: Point; // ball velocity
	leftPaddle: number; // left paddle position (only y component, we know leftPaddle.x will be 0)
	rightPaddle: number; // right paddle position (only y component, we know rightPaddle.x will be board_x_size)
	leftScore: number;
	rightScore: number;
	leftPlayer: string;
	rightPlayer: string
	playerGiveUp: string;
	canvasWidth: number;
	canvasHeight: number;
	paddleWidth: number;	
	paddleHeight: number;
	ballRadius: number;

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
			next.ballVel.x = current.initial_velocity;
			// We randomize y component so that the ball will not move on a straight line
			do {
				next.ballVel.y = Math.floor(Math.random() * (current.initial_velocity + 1));
			} while (next.ballVel.y === 0)
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
			next.ballVel.x = -current.initial_velocity;
			do {
				next.ballVel.y = Math.floor(Math.random() * (current.initial_velocity + 1));
			} while (next.ballVel.y === 0)
		}
	}
}

function nextState(current: State, leftPlayerMove: number, rightPlayerMove: number): State {

	let next = new State(current);

	updatePaddlePosition(next, leftPlayerMove, rightPlayerMove);
	updateBallPosition(current, next);

	return next;
}