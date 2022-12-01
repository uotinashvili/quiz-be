import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class AuthController {
    private readonly _userService;
    constructor(_userService: UserService);
    auth(code: string, session: Record<string, any>): Promise<UserDto>;
    getDeepLink(token: string): Promise<any>;
    getInstallUrl(): Promise<{
        url: URL;
        state: string;
        verifier: string;
    }>;
    private getToken;
    private getUserInfo;
}
