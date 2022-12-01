export interface QuizDto {
  title: string;
  creatorId: string;
  creator: string;
  questions: QuestionDto[];
}

export interface SendAnswerDto {
  userName: string;
  quizId: number;
  answers: number[];
}

export interface ResultDto {
  userName: string;
  quizId: number;
  score: number;
  totalCount: number;
}

interface QuestionDto {
  title: string;
  quizId: number;
  correctAnswer?: boolean;
  answers: AnswerDto[];
}

interface AnswerDto {
  option: string;
}
