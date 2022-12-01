import { PrismaService } from 'src/shared/prisma.service';
import { QuizDto, ResultDto } from './quiz.dto';
import { IQuestion, IQuiz, IResult } from './quiz.model';
export declare class QuizService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllQuizes(): Promise<IQuiz[]>;
    getQuestionsByQuizId(id: string): Promise<IQuestion[]>;
    getResults(id: string): Promise<IResult[]>;
    getCorrectAnswers(): Promise<{
        id: number;
    }[]>;
    createQuiz(quiz: QuizDto): Promise<IQuiz>;
    setResults(result: ResultDto): Promise<IResult>;
}
