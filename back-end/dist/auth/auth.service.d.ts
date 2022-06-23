import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    validate42User(login42: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    updateSecret(code: string, id: string): Promise<void>;
    enable2FA(id: string): Promise<string>;
    disable2FA(id: string): Promise<void>;
}
