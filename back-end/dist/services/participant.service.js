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
exports.ParticipantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const participant_entity_1 = require("../models/participant.entity");
const RoomSnippetDto_dto_1 = require("../dtos/out/RoomSnippetDto.dto");
const class_transformer_1 = require("class-transformer");
let ParticipantService = class ParticipantService {
    constructor(participantRepository) {
        this.participantRepository = participantRepository;
    }
    async createParticipant(participantDto) {
        const new_participant = new participant_entity_1.Participant();
        new_participant.userId = participantDto.userId;
        new_participant.roomId = participantDto.roomId;
        await this.participantRepository.save(new_participant);
        const dto = (0, class_transformer_1.plainToClass)(RoomSnippetDto_dto_1.RoomSnippetDto, new_participant);
        return dto;
    }
    async getUseridRooms(userId) {
        const roomIds = await this.participantRepository
            .createQueryBuilder("participant")
            .leftJoinAndSelect("participant.room", "room")
            .select(["participant.roomId", "room.name"])
            .where("participant.userId = :id", { id: userId })
            .getRawMany();
        return roomIds;
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
        console.log('participantDto ', participantDto, userId, roomId);
        const id = await this.participantRepository
            .createQueryBuilder("participant")
            .select(["participant.id"])
            .where("participant.userId = :userId AND participant.roomId = :roomId", { userId: userId, roomId: roomId })
            .getOne();
        console.log('id is', id);
        if (id != undefined)
            await this.participantRepository.delete(id);
    }
};
ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participant_entity_1.Participant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ParticipantService);
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=participant.service.js.map