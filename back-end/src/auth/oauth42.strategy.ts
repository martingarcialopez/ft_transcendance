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

            // authorizationURL: "https://api.intra.42.fr/oauth/authorize?client_id=82931d5147b41888714cb6bb0eefb883af55984e31edb80157b9fa91b5d4dd15&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fredirect&response_type=code",
            authorizationURL: "https://api.intra.42.fr/oauth/authorize?client_id=82931d5147b41888714cb6bb0eefb883af55984e31edb80157b9fa91b5d4dd15&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code",
            tokenURL: "https://api.intra.42.fr/oauth/token",
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: `http://localhost:3000/auth/redirect`,
            scope: "public"

        });
    }

    async validate(accessToken: string, refreshToken: string/*, user: User*/) {

        console.log(`We did it !! 42 token is ${accessToken}. refresh token: ${refreshToken}`)

        // const { data } = await lastValueFrom(this.httpService.get('https://api.intra.42.fr/v2/me', {
        //     headers: { Authorization: `Bearer ${accessToken}` },
        // }))

        const { data } = await this.httpService.axiosRef.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { login, first_name, last_name, image_url } = data;

        console.log(`login: ${login}, firstname: ${first_name}, lastname: ${last_name}, photo: ${image_url}`)

        const existingUser : User = await this.authService.validate42User(login);

        if (existingUser) {
            console.log('USER ALREADY EXIST !')
            return existingUser; // If user already exists, we return user and validation ends here
        }

        const usernameExists: User = await this.userService.getUser(login);

        const user = new User();

        user.login42 = login;
        user.username = !usernameExists ? login: `${login}_2`;
        user.firstname = first_name;
        user.lastname = last_name;
        user.password = null;
        user.twofa = false;
        user.avatar = `/shared/avatar/${login}.png`;

        const writer = createWriteStream(`/usr/src/app/public${user.avatar}`, {flags: 'w'});

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

        console.log('after all 42 requests, still alive bby');
        
        return this.userService.create42User(user);
    }
}