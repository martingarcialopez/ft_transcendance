"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth42Guard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let Oauth42Guard = class Oauth42Guard extends (0, passport_1.AuthGuard)('Oauth42') {
};
Oauth42Guard = __decorate([
    (0, common_1.Injectable)()
], Oauth42Guard);
exports.Oauth42Guard = Oauth42Guard;
//# sourceMappingURL=oauth42.guard.js.map