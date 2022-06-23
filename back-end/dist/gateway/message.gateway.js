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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const message_service_1 = require("../services/message.service");
const common_2 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const message_dto_1 = require("../dtos/in/message.dto");
const user_service_1 = require("../services/user.service");
let MessageGateway = class MessageGateway {
    constructor(messageService, userService) {
        this.messageService = messageService;
        this.userService = userService;
    }
    async createMessage(message) {
        console.log('in message gw ', message);
        var value = await this.messageService.createMessage(message);
        this.server
            .to(message.channelIdDst.toString())
            .emit('MsgtoChat', value);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.Bind)((0, websockets_1.MessageBody)(), (0, websockets_1.ConnectedSocket)()),
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "createMessage", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        user_service_1.UserService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map