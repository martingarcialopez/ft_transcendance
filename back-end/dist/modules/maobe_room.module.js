"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaobeRoomModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../models/user.entity");
const maobe_room_entity_1 = require("../models/maobe_room.entity");
const maobe_message_entity_1 = require("../models/maobe_message.entity");
const maobe_participant_entity_1 = require("../models/maobe_participant.entity");
const maobe_room_service_1 = require("../services/maobe_room.service");
const user_module_1 = require("./user.module");
const maobe_message_module_1 = require("./maobe_message.module");
const maobe_participant_module_1 = require("./maobe_participant.module");
let MaobeRoomModule = class MaobeRoomModule {
};
MaobeRoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([maobe_room_entity_1.MaobeRoom, maobe_participant_entity_1.MaobeParticipant, user_entity_1.User, maobe_message_entity_1.MaobeMessage]), user_module_1.UserModule, maobe_message_module_1.MaobeMessageModule, maobe_participant_module_1.MaobeParticipantModule],
        providers: [maobe_room_service_1.MaobeRoomService],
        exports: [maobe_room_service_1.MaobeRoomService],
    })
], MaobeRoomModule);
exports.MaobeRoomModule = MaobeRoomModule;
//# sourceMappingURL=maobe_room.module.js.map