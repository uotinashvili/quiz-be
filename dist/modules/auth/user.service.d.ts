import { PrismaService } from 'src/shared/prisma.service';
import { UserDto } from './user.dto';
import { IUser } from './user.model';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    auth(user: UserDto): Promise<void>;
    getUser(id: string): Promise<IUser>;
    private register;
    private login;
}
