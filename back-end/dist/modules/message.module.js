"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("../models/message.entity");
const message_service_1 = require("../services/message.service");
const user_service_1 = require("../services/user.service");
const user_entity_1 = require("../models/user.entity");
const friends_entity_1 = require("../models/friends.entity");
const gamehistory_entity_1 = require("../models/gamehistory.entity");
const matchmaking_entity_1 = require("../models/matchmaking.entity");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, user_entity_1.User, friends_entity_1.Relationship, gamehistory_entity_1.GameHistory, matchmaking_entity_1.Matchmaking]),],
        providers: [message_service_1.MessageService, user_service_1.UserService],
        exports: [message_service_1.MessageService],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map