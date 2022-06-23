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
exports.ParticipantGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const participant_service_1 = require("../services/participant.service");
const socket_io_1 = require("socket.io");
const participant_dto_1 = require("../dtos/in/participant.dto");
let ParticipantGateway = class ParticipantGateway {
    constructor(participantService) {
        this.participantService = participantService;
    }
    async createParticipant(socket, participant) {
        console.log('Enter to createParticipant event');
        console.log('userId:', participant.userId, ' roomId: ', participant.roomId);
        const participantId = await this.participantService.createParticipant(participant);
        console.log('after call createParticipant service and send to front');
        socket.emit('participantId', participantId);
        console.log('already send to FRONT');
    }
    async getParticipant(room_id) {
        const all_participant = await this.participantService.getParticipant(room_id);
    }
    async getUseridRooms(userId) {
        const rooms = await this.participantService.getUseridRooms(userId);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ParticipantGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createParticipant'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, participant_dto_1.ParticipantDto]),
    __metadata("design:returntype", Promise)
], ParticipantGateway.prototype, "createParticipant", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getParticipant'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParticipantGateway.prototype, "getParticipant", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUseridRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParticipantGateway.prototype, "getUseridRooms", null);
ParticipantGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [participant_service_1.ParticipantService])
], ParticipantGateway);
exports.ParticipantGateway = ParticipantGateway;
//# sourceMappingURL=participant.gateway.js.map