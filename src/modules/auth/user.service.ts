import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { UserDto } from './user.dto';
import { IUser } from './user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async auth(user: UserDto) {
    const existingUser = await this.getUser(user.userId);

    if (existingUser) {
      await this.login(user, existingUser);
    } else {
      await this.register(user);
    }
  }

  async getUser(id: string): Promise<IUser> {
    return await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
    });
  }

  private async register(user: UserDto): Promise<IUser> {
    return this.prisma.user.create({
      data: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      },
    });
  }

  private async login(user: UserDto, existingUser: IUser): Promise<UserDto> {
    if (!existingUser) {
      throw new NotFoundException('User not found!');
    }

    if (user.token !== existingUser.token) {
      await this.prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          token: user.token,
        },
      });
    }

    return user;
  }
}
