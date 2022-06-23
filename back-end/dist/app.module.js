"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./models/user.entity");
const user_module_1 = require("./modules/user.module");
const axios_1 = require("@nestjs/axios");
const auth_module_1 = require("./auth/auth.module");
const message_entity_1 = require("./models/message.entity");
const message_module_1 = require("./modules/message.module");
const message_gateway_1 = require("./gateway/message.gateway");
const room_entity_1 = require("./models/room.entity");
const room_module_1 = require("./modules/room.module");
const room_gateway_1 = require("./gateway/room.gateway");
const participant_entity_1 = require("./models/participant.entity");
const participant_module_1 = require("./modules/participant.module");
const participant_gateway_1 = require("./gateway/participant.gateway");
const pong_gateway_1 = require("./gateway/pong.gateway");
const matchmaking_entity_1 = require("./models/matchmaking.entity");
const pong_module_1 = require("./modules/pong.module");
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
const config_1 = require("@nestjs/config");
const friends_entity_1 = require("./models/friends.entity");
const gamehistory_entity_1 = require("./models/gamehistory.entity");
const maobe_chat_gateway_1 = require("./gateway/maobe_chat.gateway");
const maobe_message_entity_1 = require("./models/maobe_message.entity");
const maobe_message_module_1 = require("./modules/maobe_message.module");
const maobe_room_entity_1 = require("./models/maobe_room.entity");
const maobe_room_module_1 = require("./modules/maobe_room.module");
const maobe_participant_entity_1 = require("./models/maobe_participant.entity");
const maobe_participant_module_1 = require("./modules/maobe_participant.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'container-postgres',
                port: 5432,
                username: 'root',
                password: 'root',
                database: 'db',
                entities: [user_entity_1.User, message_entity_1.Message, maobe_message_entity_1.MaobeMessage, room_entity_1.Room, maobe_room_entity_1.MaobeRoom, participant_entity_1.Participant, maobe_participant_entity_1.MaobeParticipant, matchmaking_entity_1.Matchmaking, friends_entity_1.Relationship, gamehistory_entity_1.GameHistory],
                synchronize: true,
            }),
            in_memory_db_1.InMemoryDBModule.forRoot({}),
            axios_1.HttpModule,
            user_module_1.UserModule,
            message_module_1.MessageModule, maobe_message_module_1.MaobeMessageModule,
            auth_module_1.AuthModule,
            room_module_1.RoomModule, participant_module_1.ParticipantModule,
            maobe_room_module_1.MaobeRoomModule, maobe_participant_module_1.MaobeParticipantModule,
            pong_module_1.PongModule,
        ],
        controllers: [],
        providers: [message_gateway_1.MessageGateway, room_gateway_1.RoomGateway, participant_gateway_1.ParticipantGateway, pong_gateway_1.PongGateway, maobe_chat_gateway_1.MaobeChatGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map