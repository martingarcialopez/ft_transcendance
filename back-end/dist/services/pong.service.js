"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const matchmaking_entity_1 = require("../models/matchmaking.entity");
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
const user_service_1 = require("./user.service");
const gamehistory_entity_1 = require("../models/gamehistory.entity");
let PongService = class PongService {
    constructor(pongRepository, gameHistoryRepository, gameService, userService) {
        this.pongRepository = pongRepository;
        this.gameHistoryRepository = gameHistoryRepository;
        this.gameService = gameService;
        this.userService = userService;
    }
    async managePlayer(socket, server, userId, difficulty) {
        let bbdd = await this.pongRepository.find({ "difficulty": difficulty });
        if (!bbdd.length) {
            const player = new matchmaking_entity_1.Matchmaking();
            player.userId = userId;
            player.difficulty = difficulty;
            player.roomName = (0, uuid_1.v4)();
            await this.pongRepository.save(player);
            socket.join(player.roomName);
            server.to(socket.id).emit('GameInfo', 'leftPlayer', player.roomName);
            console.log(`first player arrived and joined room ${player.roomName}`);
        }
        else {
            let opponent = bbdd.at(0);
            this.pongRepository.delete({ userId: opponent.userId });
            socket.join(opponent.roomName);
            server.to(socket.id).emit('GameInfo', 'rightPlayer', opponent.roomName);
            console.log(`second player arrived and joined room ${opponent.roomName}`);
            console.log(`GAME STARTED in room ${opponent.roomName}`);
            const gameResult = new gamehistory_entity_1.GameHistory();
            console.log(`opponent id is ${opponent.userId}`);
            console.log(`my user id is ${userId}`);
            gameResult.id = opponent.roomName;
            gameResult.leftPlayer = (await this.userService.getUserById(opponent.userId.toString())).username;
            gameResult.rightPlayer = (await this.userService.getUserById(userId.toString())).username;
            this.gameHistoryRepository.save(gameResult);
            server.to(opponent.roomName).emit("GamePlayerName", gameResult.leftPlayer, gameResult.rightPlayer);
            console.log(`left player is ${gameResult.leftPlayer}`);
            console.log(`right player is ${gameResult.rightPlayer}`);
            this.playGame(server, opponent.roomName, difficulty);
        }
    }
    async playGame(socket, socketRoom, difficulty) {
        console.log(`playGame :.>.>: GAME STARTED IN ROOM ${socketRoom}`);
        let state = initGameState(difficulty);
        let lastMove = 0;
        let winner;
        let paddleSpeed = 10;
        while (true) {
            if (state.leftScore >= 3 || state.rightScore >= 3) {
                if (state.leftScore >= 3)
                    winner = 'leftplayer';
                else if (state.rightScore >= 3)
                    winner = 'rightplayer';
                socket.to(socketRoom).emit('gameOver', winner);
                const move = this.gameService.getAll();
                move.filter(elem => elem.room === socketRoom).forEach(elem => this.gameService.delete(elem.id));
                const gameResult = (await this.gameHistoryRepository.find({ where: { id: socketRoom } })).at(0);
                if (!gameResult)
                    throw new common_1.InternalServerErrorException();
                gameResult.leftPlayerScore = state.leftScore;
                gameResult.rightPlayerScore = state.rightScore;
                gameResult.winner = (winner === 'rightplayer') ? gameResult.rightPlayer : gameResult.leftPlayer;
                gameResult.losser = (winner === 'rightplayer') ? gameResult.leftPlayer : gameResult.rightPlayer;
                console.log("saving this");
                console.log(gameResult);
                const updateResult = await this.gameHistoryRepository.save(gameResult);
                console.log('result is');
                console.log(updateResult);
                return;
            }
            const move = this.gameService.getAll();
            let leftPlayerMove = 0;
            let rightPlayerMove = 0;
            if (move.length > lastMove) {
                for (let i = lastMove; i < move.length; i++) {
                    if (move[i].player === "leftPlayer")
                        leftPlayerMove += move[i].move;
                    else if (move[i].player === "rightPlayer")
                        rightPlayerMove += move[i].move;
                }
            }
            lastMove = move.length;
            const prevTotalScore = state.leftScore + state.rightScore;
            state = nextState(state, leftPlayerMove * paddleSpeed, rightPlayerMove * paddleSpeed);
            socket.to(socketRoom).emit('gameState', state);
            if (prevTotalScore != state.leftScore + state.rightScore)
                await sleep(400);
            else
                await sleep(40);
        }
    }
    async registerMove(move) {
        const created = this.gameService.create({
            id: (0, uuid_1.v4)(),
            room: move[1],
            player: move[2],
            move: move[3]
        });
    }
};
PongService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(matchmaking_entity_1.Matchmaking)),
    __param(1, (0, typeorm_1.InjectRepository)(gamehistory_entity_1.GameHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        in_memory_db_1.InMemoryDBService,
        user_service_1.UserService])
], PongService);
exports.PongService = PongService;
function initGameState(difficulty) {
    var vel = 10;
    if (difficulty === "easy")
        vel = 5;
    else if (difficulty === "hard")
        vel = 20;
    return new State({
        initial_velocity: vel,
        ballPos: new Point(board_x_size / 2, board_y_size / 2),
        ballVel: new Point(vel, Math.floor(Math.random() * (vel + 1))),
        leftPaddle: board_y_size / 2,
        rightPaddle: board_y_size / 2,
        leftScore: 0,
        rightScore: 0
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var board_x_size = 600;
var board_y_size = 300;
var paddle_size = 70;
var paddle_width = 20;
var ball_radius = 10;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(p) {
        this.x += p.x;
        this.y += p.y;
    }
}
class State {
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
function updatePaddlePosition(next, leftPlayerMove, rightPlayerMove) {
    next.leftPaddle += leftPlayerMove;
    if (next.leftPaddle + paddle_size / 2 >= board_y_size)
        next.leftPaddle = board_y_size - paddle_size / 2;
    else if (next.leftPaddle - paddle_size / 2 <= 0)
        next.leftPaddle = paddle_size / 2;
    next.rightPaddle += rightPlayerMove;
    if (next.rightPaddle + paddle_size / 2 >= board_y_size)
        next.rightPaddle = board_y_size - paddle_size / 2;
    else if (next.rightPaddle - paddle_size / 2 <= 0)
        next.rightPaddle = paddle_size / 2;
}
function updateBallPosition(current, next) {
    next.ballPos.add(current.ballVel);
    if (next.ballPos.y + ball_radius >= board_y_size) {
        next.ballPos.y = board_y_size - ball_radius;
        next.ballVel.y = -current.ballVel.y;
    }
    else if (next.ballPos.y - ball_radius <= 0) {
        next.ballPos.y = ball_radius;
        next.ballVel.y = -current.ballVel.y;
    }
    if (next.ballPos.x - ball_radius <= paddle_width + 2) {
        if (Math.abs(next.ballPos.y - next.leftPaddle) <= paddle_size / 2) {
            next.ballPos.x = paddle_width + ball_radius;
            next.ballVel.x = -current.ballVel.x;
        }
        else if (next.ballPos.x <= 0) {
            next.rightScore += 1;
            next.ballPos.x = board_x_size / 2 + 50;
            next.ballPos.y = board_y_size / 2;
            next.ballVel.x = current.initial_velocity;
            next.ballVel.y = Math.floor(Math.random() * (current.initial_velocity + 1));
        }
    }
    else if (next.ballPos.x + ball_radius >= (board_x_size - paddle_width - 2)) {
        if (Math.abs(next.ballPos.y - next.rightPaddle) <= paddle_size / 2) {
            next.ballPos.x = board_x_size - paddle_width - ball_radius;
            next.ballVel.x = -current.ballVel.x;
        }
        else if (next.ballPos.x >= board_x_size) {
            next.leftScore += 1;
            next.ballPos.x = board_x_size / 2;
            next.ballPos.y = board_y_size / 2;
            next.ballVel.x = -current.initial_velocity;
            next.ballVel.y = Math.floor(Math.random() * (current.initial_velocity + 1));
        }
    }
}
function nextState(current, leftPlayerMove, rightPlayerMove) {
    let next = new State(current);
    updatePaddlePosition(next, leftPlayerMove, rightPlayerMove);
    updateBallPosition(current, next);
    return next;
}
//# sourceMappingURL=pong.service.js.map