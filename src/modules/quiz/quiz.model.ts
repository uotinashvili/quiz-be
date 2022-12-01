export interface IQuiz {
    id: number;
    title: string;
    creatorId: string;
    creator: string;
}

export interface IQuestion {
    id: number;
    title: string;
    quizId: number;
}

export interface IResult {
    id: number;
    userName: string;
    quizId: number;
    score: number;
    totalCount: number;
}