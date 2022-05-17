import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io'

import { Pong } from '../models/pong.entity';
import { PongDto } from '../dtos/in/pong.dto';

@Injectable()
export class PongService {
	/*if needed*/
	//	@Inject(UserService)
	//  private readonly userService: UserService;
	constructor(
		@InjectRepository(Pong) private readonly pongRepository: Repository<Pong>,
	) { }


	async PlayGame(client: Socket) {

		let state: State = initGameState();

		 while (true) {

			state = nextState(state, 0, 0);

			client.emit('gameState', state);

			console.log(state);

			await sleep(2000); // sleep in ms

			return ;

		 }

	}

	async moveAction(pongDto: PongDto): Promise<void> {
		//DO SOME STUSS
	}
}










function initGameState(): State {

	return new State(
		{
			ballPos: new Point(board_x_size / 2, board_y_size / 2),
			ballVel: new Point(20, Math.floor(Math.random() * (20 + 1))),
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
var paddle_size: number = 50;

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
	if (next.leftPaddle + paddle_size / 2 > board_y_size) // if paddle exits canvas (lower end), block it at the bottom
		next.leftPaddle = board_y_size - paddle_size / 2;
	else if (next.leftPaddle + paddle_size / 2 < 0) // if paddle exits canvas (higher end), block it at the top
		next.leftPaddle = paddle_size / 2;

	next.rightPaddle += rightPlayerMove;
	if (next.rightPaddle + paddle_size / 2 > board_y_size)
		next.rightPaddle = board_y_size - paddle_size / 2;
	else if (next.rightPaddle + paddle_size / 2 < 0)
		next.rightPaddle = paddle_size / 2;

}

function updateBallPosition(current: State, next: State) {

	// calculate next ball position adding current position with current velocity (friction is not yet taken into account)
	next.ballPos.add(current.ballVel);

	if (next.ballPos.y >= board_y_size) { // if ball touches lower edge, make it bounce
		next.ballPos.y = board_y_size; // keep ball inside the canvas (ball radius not taken into account yet)
		next.ballVel.y = -current.ballVel.y; // change the y velocity component, so next turn will rebound in opposite direction
	}
	else if (next.ballPos.y <= 0) { // same calculations if ball touches higher edge
		next.ballPos.y = 0;
		next.ballVel.y = -current.ballVel.y;
	}

	if (next.ballPos.x <= 0) { // Could be a Goal or a Rebound (Paddle width not taken into account yet)

		if (Math.abs(next.ballPos.y - next.leftPaddle) <= paddle_size / 2) { // if rebounds on paddle

			next.ballPos.x = 0; // keep the ball touching the paddle
			next.ballVel.x = -current.ballVel.x; // change the x velocity component, so next turn will rebound in opposite direction

		} else { // If there were no paddle to stop it >> There is a Goal

			// rightPlayer scores a point
			next.rightScore += 1;
			// Ball spawns close to the center but closer to player that have just scored
			next.ballPos.x = board_x_size / 2 + 50;
			next.ballPos.y = board_y_size / 2;
			// Ball also heads in the direction of player that have just scored
			next.ballVel.x = 20;
			// We randomize y component so that the ball will not move on a straight line
			next.ballVel.y = Math.floor(Math.random() * (20 + 1));
		}
	}
	else if (next.ballPos.x >= board_x_size) { // exact same calculations on the other field

		if (Math.abs(next.ballPos.y - next.rightPaddle) <= paddle_size / 2) {

			next.ballPos.x = board_x_size;
			next.ballVel.x = -current.ballVel.x;

		} else {

			next.leftScore += 1;
			next.ballPos.x = board_x_size / 2;
			next.ballPos.y = board_y_size / 2;
			next.ballVel.x = -20;
			next.ballVel.y = Math.floor(Math.random() * (20 + 1));
		}
	}
}

function nextState(current: State, leftPlayerMove: number, rightPlayerMove: number): State {

	let next = new State(current);

	updatePaddlePosition(next, leftPlayerMove, rightPlayerMove);
	updateBallPosition(current, next);

	return next;
}
