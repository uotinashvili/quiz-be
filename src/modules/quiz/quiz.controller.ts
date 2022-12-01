import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { CurrentUser } from 'src/shared/current-user.decorator';
import { QuizDto, ResultDto, SendAnswerDto } from './quiz.dto';
import { IQuestion, IQuiz, IResult } from './quiz.model';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly _quizService: QuizService) {}

  @Get('all')
  @UseGuards(AuthGuard)
  getAllQuiz(): Promise<IQuiz[]> {
    return this._quizService.getAllQuizes();
  }

  @Get('questions/:quizid')
  async getQuestionsByQuizId(
    @Param('quizid') id: string,
  ): Promise<IQuestion[]> {
    return await this._quizService.getQuestionsByQuizId(id);
  }

  @Get('/results/:quizid')
  async getResults(@Param('quizid') quizid: string): Promise<IResult[]> {
    return await this._quizService.getResults(quizid);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  async createQuiz(@Body() quiz: QuizDto): Promise<IQuiz> {
    return await this._quizService.createQuiz(quiz);
  }

  @Post('result/sendanswers')
  @UseGuards(AuthGuard)
  async sendAnswers(@Body() answers: SendAnswerDto): Promise<IResult> {
    const dbCorrectAnswerIds = (
      await this._quizService.getCorrectAnswers()
    ).map((x) => x.id);

    let correctAnswersCount = 0;

    answers.answers.forEach((answerId) => {
      if (dbCorrectAnswerIds.includes(answerId)) {
        correctAnswersCount++;
      }
    });

    const result = {
      userName: answers.userName,
      quizId: answers.quizId,
      score: correctAnswersCount,
      totalCount: answers.answers.length,
    } as ResultDto;

    return await this._quizService.setResults(result);
  }
}
