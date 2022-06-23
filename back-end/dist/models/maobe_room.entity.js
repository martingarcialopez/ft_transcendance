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
exports.MaobeRoom = void 0;
const typeorm_1 = require("typeorm");
const maobe_message_entity_1 = require("./maobe_message.entity");
const maobe_participant_entity_1 = require("./maobe_participant.entity");
let MaobeRoom = class MaobeRoom {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MaobeRoom.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MaobeRoom.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MaobeRoom.prototype, "typeRoom", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], MaobeRoom.prototype, "is_protected", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: null }),
    __metadata("design:type", String)
], MaobeRoom.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MaobeRoom.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MaobeRoom.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true, array: true, default: "{}" }),
    __metadata("design:type", Array)
], MaobeRoom.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true, array: true, default: "{}" }),
    __metadata("design:type", Array)
], MaobeRoom.prototype, "banList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => maobe_message_entity_1.MaobeMessage, (message) => message.room),
    __metadata("design:type", Array)
], MaobeRoom.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => maobe_participant_entity_1.MaobeParticipant, (participant) => participant.room),
    __metadata("design:type", Array)
], MaobeRoom.prototype, "participants", void 0);
MaobeRoom = __decorate([
    (0, typeorm_1.Entity)()
], MaobeRoom);
exports.MaobeRoom = MaobeRoom;
//# sourceMappingURL=maobe_room.entity.js.map