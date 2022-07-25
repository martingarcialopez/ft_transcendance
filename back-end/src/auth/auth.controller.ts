import { Controller, Request, UseGuards, Post, Get, Redirect } from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout (@Request() req) {
        this.authService.logout(req.user);
    }

    @UseGuards(Oauth42Guard)
    @Get('/redirect')
    @Redirect('http://localhost:8080/auth/success', 302)
    async getUserFrom42Intra(@Request() req) {
        const response = await this.authService.login(req.user); //returns a JWT
        return { url: `http://localhost:8080/auth/success/${response.access_token}` }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/enable2FA')
    async enable2FA(@Request() req) : Promise<string> {
        return await this.authService.enable2FA(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/disable2FA')
    async disable2FA(@Request() req) {
        return await this.authService.disable2FA(req.user.userId);
    }


}