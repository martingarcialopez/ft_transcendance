import { Strategy } from "passport-oauth2";
import { PassportStrategy } from "@nestjs/passport"; import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/models/user.entity";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { createWriteStream } from "fs";
import { AuthService } from "./auth.service";
import { UserService } from "src/services/user.service";

@Injectable()
export class Oauth42Strategy extends PassportStrategy(Strategy, 'Oauth42') {


    constructor(private httpService: HttpService, private authService: AuthService, private userService: UserService) {
        super({

            authorizationURL: 'https://api.intra.42.fr/oauth/authorize?client_id=cf72ee9e9567d932423b583e5629802719575881cc5a4ab8c883b5d153639c00&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code',
            tokenURL: "https://api.intra.42.fr/oauth/token",
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `http://localhost:3000/auth/redirect`,
            scope: "public"

        });
    }

    async validate(accessToken: string, refreshToken: string/*, user: User*/) {

        const { data } = await lastValueFrom(this.httpService.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        }))
        const { login, first_name, last_name, image_url } = data;

        console.log(`login: ${login}, firstname: ${first_name}, lastname: ${last_name}, photo: ${image_url}`)

        const existingUser : User = await this.authService.validate42User(login);

        if (existingUser)
            return existingUser; // If user already exists, we return user and validation ends here

        const user = new User();

        user.login42 = login;
        user.username = login;
        user.firstname = first_name;
        user.lastname = last_name;
        user.password = null;
        user.twofa = false;
        user.avatar = `/usr/src/app/public/shared/avatar/${login}.png`;

        const writer = createWriteStream(user.avatar, {flags: 'w'});

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

}