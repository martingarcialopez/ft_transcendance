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
exports.MaobeMessage = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const maobe_room_entity_1 = require("./maobe_room.entity");
let MaobeMessage = class MaobeMessage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MaobeMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MaobeMessage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MaobeMessage.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.messages),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], MaobeMessage.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MaobeMessage.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => maobe_room_entity_1.MaobeRoom, (room) => room.messages),
    (0, typeorm_1.JoinColumn)({ name: 'roomId' }),
    __metadata("design:type", maobe_room_entity_1.MaobeRoom)
], MaobeMessage.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MaobeMessage.prototype, "roomId", void 0);
MaobeMessage = __decorate([
    (0, typeorm_1.Entity)()
], MaobeMessage);
exports.MaobeMessage = MaobeMessage;
//# sourceMappingURL=maobe_message.entity.js.map