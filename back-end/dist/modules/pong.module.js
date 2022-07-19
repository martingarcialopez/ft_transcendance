"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongModule = void 0;
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pong_controller_1 = require("../controllers/pong.controller");
const gamehistory_entity_1 = require("../models/gamehistory.entity");
const user_entity_1 = require("../models/user.entity");
const matchmaking_entity_1 = require("../models/matchmaking.entity");
const pong_service_1 = require("../services/pong.service");
const user_module_1 = require("./user.module");
let PongModule = class PongModule {
};
PongModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([matchmaking_entity_1.Matchmaking, gamehistory_entity_1.GameHistory, user_entity_1.User]), user_module_1.UserModule],
        controllers: [pong_controller_1.PongController],
        providers: [pong_service_1.PongService, in_memory_db_1.InMemoryDBService],
        exports: [pong_service_1.PongService],
    })
], PongModule);
exports.PongModule = PongModule;
//# sourceMappingURL=pong.module.js.map