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
exports.MaobeParticipant = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const maobe_room_entity_1 = require("./maobe_room.entity");
let MaobeParticipant = class MaobeParticipant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MaobeParticipant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamptz", { nullable: true, default: '2019-06-29' }),
    __metadata("design:type", Date)
], MaobeParticipant.prototype, "mute_until", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.participants),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], MaobeParticipant.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MaobeParticipant.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => maobe_room_entity_1.MaobeRoom, (room) => room.participants),
    (0, typeorm_1.JoinColumn)({ name: 'roomId' }),
    __metadata("design:type", maobe_room_entity_1.MaobeRoom)
], MaobeParticipant.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MaobeParticipant.prototype, "roomId", void 0);
MaobeParticipant = __decorate([
    (0, typeorm_1.Entity)()
], MaobeParticipant);
exports.MaobeParticipant = MaobeParticipant;
//# sourceMappingURL=maobe_participant.entity.js.map