import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';
export declare class OauthMiddleware implements NestMiddleware {
    private httpService;
    constructor(httpService: HttpService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
