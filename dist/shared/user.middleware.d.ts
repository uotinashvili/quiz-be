import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/modules/auth/user.service';
declare global {
    namespace Express {
        interface Request {
            currentUser?: any;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private _userService;
    constructor(_userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
