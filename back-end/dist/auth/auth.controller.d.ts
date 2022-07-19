import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    logout(req: any): Promise<void>;
    getUserFrom42Intra(req: any): Promise<{
        access_token: string;
    }>;
    enable2FA(req: any): Promise<string>;
    disable2FA(req: any): Promise<void>;
}
