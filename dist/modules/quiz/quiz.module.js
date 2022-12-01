"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma.service");
const quiz_controller_1 = require("./quiz.controller");
const quiz_gateway_1 = require("./quiz.gateway");
const quiz_service_1 = require("./quiz.service");
let QuizModule = class QuizModule {
};
QuizModule = __decorate([
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService, quiz_service_1.QuizService, quiz_gateway_1.QuizGateway],
        controllers: [quiz_controller_1.QuizController]
    })
], QuizModule);
exports.QuizModule = QuizModule;
//# sourceMappingURL=quiz.module.js.map