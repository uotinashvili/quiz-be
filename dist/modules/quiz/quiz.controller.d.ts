import { QuizDto, SendAnswerDto } from './quiz.dto';
import { IQuestion, IQuiz, IResult } from './quiz.model';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private readonly _quizService;
    constructor(_quizService: QuizService);
    getAllQuiz(): Promise<IQuiz[]>;
    getQuestionsByQuizId(id: string): Promise<IQuestion[]>;
    getResults(quizid: string): Promise<IResult[]>;
    createQuiz(quiz: QuizDto): Promise<IQuiz>;
    sendAnswers(answers: SendAnswerDto): Promise<IResult>;
}
