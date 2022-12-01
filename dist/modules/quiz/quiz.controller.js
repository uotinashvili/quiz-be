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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../shared/auth.guard");
const quiz_service_1 = require("./quiz.service");
let QuizController = class QuizController {
    constructor(_quizService) {
        this._quizService = _quizService;
    }
    getAllQuiz() {
        return this._quizService.getAllQuizes();
    }
    async getQuestionsByQuizId(id) {
        return await this._quizService.getQuestionsByQuizId(id);
    }
    async getResults(quizid) {
        return await this._quizService.getResults(quizid);
    }
    async createQuiz(quiz) {
        return await this._quizService.createQuiz(quiz);
    }
    async sendAnswers(answers) {
        console.log('answers', answers);
        const dbCorrectAnswerIds = (await this._quizService.getCorrectAnswers()).map((x) => x.id);
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
        };
        return await this._quizService.setResults(result);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getAllQuiz", null);
__decorate([
    (0, common_1.Get)('questions/:quizid'),
    __param(0, (0, common_1.Param)('quizid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getQuestionsByQuizId", null);
__decorate([
    (0, common_1.Get)('/results/:quizid'),
    __param(0, (0, common_1.Param)('quizid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "getResults", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Post)('result/sendanswers'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "sendAnswers", null);
QuizController = __decorate([
    (0, common_1.Controller)('quiz'),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
exports.QuizController = QuizController;
//# sourceMappingURL=quiz.controller.js.map