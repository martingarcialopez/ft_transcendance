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
exports.OauthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const tokenEndpoint = "https://api.intra.42.fr/oauth/token";
let OauthMiddleware = class OauthMiddleware {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async use(req, res, next) {
        console.log('Hello from Middleware...');
        var code = req.query.code;
        console.log(code);
        if (!code)
            res.status(401).send("Missing authorization code");
        const grant_type = "authorization_code";
        const client_id = "0d77316db950f62b0c04ce5cb7615491ce8e70486696b85c25473932430686d4";
        const client_secret = "24467ba395d0b6c69823d05c4350e99ca01cfbca1bf9d7b93aa2dd6440538e07";
        const redirect_uri = `http://${process.env.SERVER_URL}:3000/oauth`;
        console.log('llegandito llegandito');
        const data = await (0, rxjs_1.lastValueFrom)(this.httpService.post(tokenEndpoint, {
            "grant_type": grant_type,
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
        }, { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
            .pipe((0, rxjs_1.map)(response => {
            res.locals.token = response.data;
            console.log(`response data is`);
            console.log("#####################################################################################");
            console.log(`${response.data}`);
            console.log("#####################################################################################");
            next();
        })))
            .catch(err => {
            console.log(err);
            res.status(403).json(`Reason: ${err.message}`);
        });
        next();
    }
};
OauthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], OauthMiddleware);
exports.OauthMiddleware = OauthMiddleware;
//# sourceMappingURL=Oauth.middleware.js.map