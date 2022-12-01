import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { QuizModule } from './modules/quiz/quiz.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [QuizModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private _configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this._configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
