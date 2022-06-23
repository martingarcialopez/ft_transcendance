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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const pong_dto_1 = require("../dtos/in/pong.dto");
const pong_service_1 = require("../services/pong.service");
let PongGateway = class PongGateway {
    constructor(pongService) {
        this.pongService = pongService;
    }
    async lookingForplay(socket, data) {
        console.log('lookingForAGame Gateway');
        console.log(`uerId is ${data[0]} and difficulty is ${data[1]}`);
        let value = await this.pongService.managePlayer(socket, this.server, data[0], data[1]);
    }
    async join(socket, pongDto) {
        console.log('joinPongRoom Gateway');
    }
    async moveAction(socket, move) {
        await this.pongService.registerMove(move);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PongGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('lookingForAGame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "lookingForplay", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinPongRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, pong_dto_1.PongDto]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "join", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('move'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], PongGateway.prototype, "moveAction", null);
PongGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [pong_service_1.PongService])
], PongGateway);
exports.PongGateway = PongGateway;
//# sourceMappingURL=pong.gateway.js.map