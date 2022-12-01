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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async auth(user) {
        const existingUser = await this.getUser(user.userId);
        if (existingUser) {
            await this.login(user, existingUser);
        }
        else {
            await this.register(user);
        }
    }
    async getUser(id) {
        return await this.prisma.user.findFirst({
            where: {
                userId: id,
            },
        });
    }
    async register(user) {
        return this.prisma.user.create({
            data: {
                userId: user.userId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: user.token,
            },
        });
    }
    async login(user, existingUser) {
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found!');
        }
        if (user.token !== existingUser.token) {
            await this.prisma.user.update({
                where: {
                    id: existingUser.id,
                },
                data: {
                    token: user.token,
                },
            });
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map