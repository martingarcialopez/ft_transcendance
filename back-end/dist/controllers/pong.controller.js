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
exports.PongController = void 0;
const common_1 = require("@nestjs/common");
const createCustomGame_dto_1 = require("../dtos/in/createCustomGame.dto");
const pong_service_1 = require("../services/pong.service");
let PongController = class PongController {
    constructor(pongService) {
        this.pongService = pongService;
    }
    createCustomGame(data) {
        return this.pongService.createCustomGame(data.userId, data.difficulty, data.maxScore);
    }
};
__decorate([
    (0, common_1.Post)('/createCustomGame'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCustomGame_dto_1.createCustomGameDto]),
    __metadata("design:returntype", Promise)
], PongController.prototype, "createCustomGame", null);
PongController = __decorate([
    (0, common_1.Controller)('pong'),
    __metadata("design:paramtypes", [pong_service_1.PongService])
], PongController);
exports.PongController = PongController;
//# sourceMappingURL=pong.controller.js.map