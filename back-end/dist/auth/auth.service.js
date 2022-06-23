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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../services/user.service");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const user = await this.usersService.getUser(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async validate42User(login42) {
        console.log('in validate 42 user');
        const user = await this.usersService.getUserBy42Login(login42);
        console.log(`user is`);
        console.log(user);
        if (user && user.login42 === login42) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const db_user = await this.usersService.getUser(user.username);
        const payload = { username: user.username, sub: db_user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async updateSecret(code, id) {
        this.usersService.updateUser({ "secret": code }, id);
    }
    async enable2FA(id) {
        const user = await this.usersService.getUserById(id);
        if (!user)
            throw new common_1.NotFoundException();
        const updatedUser = await this.usersService.updateUser({ twofa: true }, id);
        console.log('updated used is');
        console.log(updatedUser);
        const secret = speakeasy.generateSecret({ name: "Amazing Pong" });
        await this.usersService.updateUser({ "secret": secret.ascii }, id);
        let qrPromise = new Promise((resolve, reject) => {
            qrcode.toDataURL(secret.otpauth_url, function (err, data) {
                if (err) {
                    reject();
                    throw new common_1.ImATeapotException();
                }
                resolve(data);
            });
        });
        return qrPromise;
    }
    async disable2FA(id) {
        const user = await this.usersService.getUserById(id);
        if (!user)
            throw new common_1.NotFoundException();
        this.usersService.updateUser({ twofa: false }, id);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map