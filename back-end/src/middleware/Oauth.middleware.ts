import { Injectable, NestMiddleware, Next, Redirect } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

const tokenEndpoint = "https://api.intra.42.fr/oauth/token";

@Injectable()
export class OauthMiddleware implements NestMiddleware {

  constructor(private httpService: HttpService) { }

  async use(req: Request, res: Response, next: NextFunction) {

    console.log('Hello from Middleware...');
    var code = req.query.code;
    console.log(code);
    if (!code)
      res.status(401).send("Missing authorization code");

    const grant_type = "authorization_code";
    const client_id = "0d77316db950f62b0c04ce5cb7615491ce8e70486696b85c25473932430686d4";
    const client_secret = "24467ba395d0b6c69823d05c4350e99ca01cfbca1bf9d7b93aa2dd6440538e07";
    const redirect_uri = `http://${process.env.SERVER_URL}:3000/oauth`;
   // const state = "aswhidl";

    console.log('llegandito llegandito')

    const data = await lastValueFrom(
      this.httpService.post(tokenEndpoint
        , {
            "grant_type":grant_type,
            "client_id":client_id,
            "client_secret":client_secret,
            "code":code,
            // "redirect_uri":redirect_uri,
            // "state":state
        }
        , { headers: { 'Content-Type': "application/x-www-form-urlencoded" } })
        .pipe(
          map(response => {
            res.locals.token = response.data;
            console.log(`response data is`)
            console.log("#####################################################################################")
            console.log(`${response.data}`)
            console.log("#####################################################################################")
            next();
          })
        )
    )
    .catch(err => {
      console.log(err);
      res.status(403).json(`Reason: ${err.message}`);
    })

    next();
  }
}

