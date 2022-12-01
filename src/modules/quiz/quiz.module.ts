import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { QuizController } from './quiz.controller';
import { QuizGateway } from './quiz.gateway';
import { QuizService } from './quiz.service';

@Module({
  providers: [PrismaService, QuizService, QuizGateway],
  controllers: [QuizController]
})
export class QuizModule {}
