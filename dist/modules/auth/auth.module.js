"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const current_user_middleware_1 = require("../../shared/current-user.middleware");
const prisma_service_1 = require("../../shared/prisma.service");
const auth_controller_1 = require("./auth.controller");
const user_service_1 = require("./user.service");
const cookieSession = require('cookie-session');
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(current_user_middleware_1.CurrentUserMiddleware, cookieSession({
            keys: ['userId'],
        })).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL
        });
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [user_service_1.UserService, prisma_service_1.PrismaService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map