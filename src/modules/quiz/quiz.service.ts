import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { QuizDto, ResultDto } from './quiz.dto';
import { IQuestion, IQuiz, IResult } from './quiz.model';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async getAllQuizes(): Promise<IQuiz[]> {
    return await this.prisma.quiz.findMany();
  }

  async getQuestionsByQuizId(id: string): Promise<IQuestion[]> {
    return await this.prisma.question.findMany({
      where: {
        quizId: +id,
      },
      include: {
        answers: {
          select: {
            id: true,
            option: true,
            questionId: true,
          },
        },
      },
    });
  }

  async getResults(id: string): Promise<IResult[]> {
    return await this.prisma.result.findMany({
      where: {
        quizId: +id,
      },
    });
  }

  async getCorrectAnswers(): Promise<{ id: number }[]> {
    return await this.prisma.answer.findMany({
      where: {
        correctAnswer: true,
      },
      select: {
        id: true,
      },
    });
  }

  async createQuiz(quiz: QuizDto): Promise<IQuiz> {
    return await this.prisma.quiz.create({
      data: {
        title: quiz.title,
        creator: quiz.creator,
        creatorId: quiz.creatorId,
        questions: {
          create: quiz.questions.map((x) => {
            return {
              title: x.title,
              correctAnswer: x.correctAnswer,
              answers: {
                create: x.answers,
              },
            };
          }),
        },
      },
    });
  }

  async setResults(result: ResultDto): Promise<IResult> {
    return await this.prisma.result.create({
      data: {
        userName: result.userName,
        quizId: result.quizId,
        score: result.score,
        totalCount: result.totalCount,
      },
    });
  }
}
