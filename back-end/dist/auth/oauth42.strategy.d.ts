/// <reference types="passport-oauth2" />
import { User } from "src/models/user.entity";
import { HttpService } from "@nestjs/axios";
import { AuthService } from "./auth.service";
import { UserService } from "src/services/user.service";
declare const Oauth42Strategy_base: new (...args: any[]) => import("passport-oauth2");
export declare class Oauth42Strategy extends Oauth42Strategy_base {
    private httpService;
    private authService;
    private userService;
    constructor(httpService: HttpService, authService: AuthService, userService: UserService);
    validate(accessToken: string, refreshToken: string): Promise<User>;
}
export {};
