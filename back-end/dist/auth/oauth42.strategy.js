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
exports.Oauth42Strategy = void 0;
const passport_oauth2_1 = require("passport-oauth2");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../models/user.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const fs_1 = require("fs");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../services/user.service");
let Oauth42Strategy = class Oauth42Strategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'Oauth42') {
    constructor(httpService, authService, userService) {
        super({
            authorizationURL: 'https://api.intra.42.fr/oauth/authorize?client_id=cf72ee9e9567d932423b583e5629802719575881cc5a4ab8c883b5d153639c00&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code',
            tokenURL: "https://api.intra.42.fr/oauth/token",
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `http://localhost:3000/auth/redirect`,
            scope: "public"
        });
        this.httpService = httpService;
        this.authService = authService;
        this.userService = userService;
    }
    async validate(accessToken, refreshToken) {
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        }));
        const { login, first_name, last_name, image_url } = data;
        console.log(`login: ${login}, firstname: ${first_name}, lastname: ${last_name}, photo: ${image_url}`);
        const existingUser = await this.authService.validate42User(login);
        if (existingUser)
            return existingUser;
        const user = new user_entity_1.User();
        user.login42 = login;
        user.username = login;
        user.firstname = first_name;
        user.lastname = last_name;
        user.password = null;
        user.twofa = false;
        user.avatar = `/usr/src/app/public/shared/avatar/${login}.png`;
        const writer = (0, fs_1.createWriteStream)(user.avatar, { flags: 'w' });
        const response = await this.httpService.axiosRef({
            url: image_url,
            method: 'GET',
            responseType: 'stream',
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        response.data.pipe(writer);
        new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        return this.userService.create42User(user);
    }
};
Oauth42Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, auth_service_1.AuthService, user_service_1.UserService])
], Oauth42Strategy);
exports.Oauth42Strategy = Oauth42Strategy;
//# sourceMappingURL=oauth42.strategy.js.map