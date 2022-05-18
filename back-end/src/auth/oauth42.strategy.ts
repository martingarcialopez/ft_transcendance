import { Strategy } from "passport-oauth2";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
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
            authorizationURL:
                `https://api.intra.42.fr/oauth/authorize?client_id=e2d030a76b4b62d20c5f0ef2b431169b9d845bdb68bfc12dc12d9aa31f215733&redirect_uri=http%3A%2F%2F${process.env.SERVER_URL}%3A8080%2Fauthentication%2Foauth2%2Fschool42%2Fcallback&response_type=code&scope=public1`,
            tokenURL: "https://api.intra.42.fr/oauth/token",
            clientID: "0d77316db950f62b0c04ce5cb7615491ce8e70486696b85c25473932430686d4",
            clientSecret: "24467ba395d0b6c69823d05c4350e99ca01cfbca1bf9d7b93aa2dd6440538e07",
            callbackURL: `http://${process.env.SERVER_URL}:3000/auth/redirect`,
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
        user.avatar = `/usr/src/app/avatar/${login}.png`;

        console.log("before createWriteStream");

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