import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CurrentUserMiddleware } from 'src/shared/current-user.middleware';
import { PrismaService } from 'src/shared/prisma.service';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';

const cookieSession = require('cookie-session');

@Module({
  providers: [UserService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware,
      cookieSession({
        keys: ['userId'],
      }),
      ).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}