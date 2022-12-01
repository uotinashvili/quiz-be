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
exports.QuizGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const quiz_service_1 = require("./quiz.service");
let QuizGateway = class QuizGateway {
    constructor(_quizService) {
        this._quizService = _quizService;
        this.clients = [];
    }
    async handleConnection(client) {
        this.clients.push(client);
    }
    async handleDisconnect(client) {
        const existingClient = this.clients.find(x => x == client);
        if (existingClient) {
            const index = this.clients.indexOf(existingClient);
            this.clients.splice(index, 1);
        }
    }
    sendMessageToAllClients(event, message) {
        const broadCastMessage = JSON.stringify(message);
        for (let c of this.clients) {
            c.emit(event, broadCastMessage);
        }
    }
    async onCreateQuiz(client, message) {
        const getAllQuizes = await this._quizService.getAllQuizes();
        this.sendMessageToAllClients('refreshQuizList', getAllQuizes);
    }
    async onSendResults(client, message) {
        this.sendMessageToAllClients('refreshResults', true);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], QuizGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('onCreateQuiz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGateway.prototype, "onCreateQuiz", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onSendResults'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuizGateway.prototype, "onSendResults", null);
QuizGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizGateway);
exports.QuizGateway = QuizGateway;
//# sourceMappingURL=quiz.gateway.js.map