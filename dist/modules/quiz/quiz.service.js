"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma.service");
let QuizService = class QuizService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllQuizes() {
        return await this.prisma.quiz.findMany();
    }
    async getQuestionsByQuizId(id) {
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
    async getResults(id) {
        return await this.prisma.result.findMany({
            where: {
                quizId: +id,
            },
        });
    }
    async getCorrectAnswers() {
        return await this.prisma.answer.findMany({
            where: {
                correctAnswer: true,
            },
            select: {
                id: true,
            },
        });
    }
    async createQuiz(quiz) {
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
    async setResults(result) {
        return await this.prisma.result.create({
            data: {
                userName: result.userName,
                quizId: result.quizId,
                score: result.score,
                totalCount: result.totalCount,
            },
        });
    }
};
QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
exports.QuizService = QuizService;
//# sourceMappingURL=quiz.service.js.map