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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const speakeasy = require("speakeasy");
function decode(data) {
    console.log('stream is ');
    console.log(data);
}
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ passReqToCallback: true });
        this.authService = authService;
    }
    async validate(req, username, password) {
        let code = req.body['code'];
        console.log(code);
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        console.log('yo yo');
        if (user.twofa === true) {
            console.log(`code is ${code}`);
            const verified = speakeasy.totp.verify({
                secret: user.secret,
                encoding: 'ascii',
                token: code
            });
            if (!verified)
                throw new common_1.HttpException('incorrect totp code', common_1.HttpStatus.I_AM_A_TEAPOT);
        }
        return user;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map