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
exports.newUser_In_Room_Message = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let newUser_In_Room_Message = class newUser_In_Room_Message {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({ allowNaN: false }),
    __metadata("design:type", Array)
], newUser_In_Room_Message.prototype, "blockList", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], newUser_In_Room_Message.prototype, "message_history", void 0);
newUser_In_Room_Message = __decorate([
    (0, class_transformer_1.Exclude)()
], newUser_In_Room_Message);
exports.newUser_In_Room_Message = newUser_In_Room_Message;
//# sourceMappingURL=newUser_In_Room_Message.dto.js.map