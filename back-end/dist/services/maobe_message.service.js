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
exports.MaobeMessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const maobe_message_entity_1 = require("../models/maobe_message.entity");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../models/user.entity");
let MaobeMessageService = class MaobeMessageService {
    constructor(messageRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async createMessage(messageDto) {
        const new_message = new maobe_message_entity_1.MaobeMessage();
        new_message.userId = messageDto.userId;
        new_message.roomId = messageDto.roomId;
        new_message.content = messageDto.content;
        var date = new Date();
        const time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        new_message.createdDate = time;
        await this.messageRepository.save(new_message);
        return new_message;
    }
    async getMessage() {
        return await this.messageRepository.find();
    }
    async getRoomMessage(body) {
        const userId = body.userId;
        const roomId = body.roomId;
        const blockList = await this.userService.getBlockList(userId);
        const messages_in_room = await this.messageRepository
            .createQueryBuilder("message")
            .where("message.roomId = :id and message.userId != all (:blockList)", { id: roomId, blockList: blockList })
            .getMany();
        console.log(messages_in_room);
        return messages_in_room;
    }
    findOne(id) {
        return this.messageRepository.findOne(id);
    }
};
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], MaobeMessageService.prototype, "userService", void 0);
MaobeMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(maobe_message_entity_1.MaobeMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MaobeMessageService);
exports.MaobeMessageService = MaobeMessageService;
//# sourceMappingURL=maobe_message.service.js.map