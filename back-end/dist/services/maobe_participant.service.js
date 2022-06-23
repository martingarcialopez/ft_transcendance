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
exports.MaobeParticipantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const maobe_participant_entity_1 = require("../models/maobe_participant.entity");
const maobe_room_service_1 = require("./maobe_room.service");
let MaobeParticipantService = class MaobeParticipantService {
    constructor(participantRepository) {
        this.participantRepository = participantRepository;
    }
    async createParticipant(participantDto) {
        const new_participant = new maobe_participant_entity_1.MaobeParticipant();
        new_participant.userId = participantDto.userId;
        new_participant.roomId = participantDto.roomId;
        await this.participantRepository.save(new_participant);
    }
    async getParticipant(id) {
        console.log('HERE in the service of getParticipant room id is ', id);
        const value = await this.participantRepository.createQueryBuilder("participant")
            .select(["participant.userId"])
            .where("participant.roomId = :room_Id", { room_Id: id })
            .getRawMany();
        console.log(value);
        return value;
    }
    async leaveRoom(participantDto) {
        let userId = participantDto.userId;
        let roomId = participantDto.roomId;
        const id = await this.participantRepository
            .createQueryBuilder("participant")
            .select(["participant.id"])
            .where("participant.userId = :userId", { userId: userId })
            .andWhere("participant.roomId = :roomId", { roomId: roomId })
            .getOne();
        if (id !== undefined) {
            await this.participantRepository.delete(id);
        }
    }
    async muteUser(participantDto) {
        const userId = participantDto.userId;
        const roomId = participantDto.roomId;
        let time = 10;
        let res = await this.participantRepository.findOne({ userId: userId, roomId: roomId });
        var current_time = new Date();
        var time_until_mute = new Date();
        time_until_mute.setTime(current_time.getTime() + (time * 60 * 1000));
        this.participantRepository.update({ id: res['id'] }, {
            mute_until: time_until_mute
        });
    }
};
__decorate([
    (0, common_1.Inject)((0, common_1.forwardRef)(() => maobe_room_service_1.MaobeRoomService)),
    __metadata("design:type", maobe_room_service_1.MaobeRoomService)
], MaobeParticipantService.prototype, "roomService", void 0);
MaobeParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(maobe_participant_entity_1.MaobeParticipant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MaobeParticipantService);
exports.MaobeParticipantService = MaobeParticipantService;
//# sourceMappingURL=maobe_participant.service.js.map