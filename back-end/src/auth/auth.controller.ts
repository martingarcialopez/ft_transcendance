import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Oauth42Guard } from './oauth42.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user); // returns a JWT
    }

    @UseGuards(Oauth42Guard)
    @Get('/redirect')
    async getUserFrom42Intra(@Request() req) {
        return this.authService.login(req.user); //returns a JWT
    }

    @UseGuards(JwtAuthGuard)
    @Post('/enable2FA')
    async enable2FA(@Request() req) : Promise<string> {
        return await this.authService.enable2FA(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/disable2FA')
    async disable2FA(@Request() req) {
        return await this.authService.disable2FA(req.userId);
    }

}

