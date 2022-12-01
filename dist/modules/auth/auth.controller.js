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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
const crypto = require("crypto");
const auth_guard_1 = require("../../shared/auth.guard");
const user_service_1 = require("./user.service");
let AuthController = class AuthController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async auth(code, session) {
        try {
            const clientId = process.env.ZOOM_CLIENT_ID;
            const clientSecret = process.env.ZOOM_CLIENT_SECRET;
            const redirectUrl = process.env.ZOOM_REDIRECT_URL;
            const token = await this.getToken(code, clientId, clientSecret, redirectUrl);
            const userInfo = await this.getUserInfo(token);
            const user = {
                userId: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.first_name,
                lastName: userInfo.last_name,
                token: token,
            };
            await this._userService.auth(user);
            session.userId = user.userId;
            return user;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Bad Auth Request!');
        }
    }
    async getDeepLink(token) {
        const response = await (0, node_fetch_1.default)(`${process.env.ZOOM_API_URL}zoomapp/deeplink`, {
            method: 'POST',
            body: JSON.stringify({
                action: JSON.stringify({
                    url: '/',
                    role_name: 'Owner',
                    verified: 1,
                    role_id: 0,
                }),
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        return await response.json();
    }
    async getInstallUrl() {
        const rand = (fmt, depth = 32) => crypto.randomBytes(depth).toString(fmt);
        const base64URL = (s) => s
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
        const state = rand('base64');
        const verifier = rand('ascii');
        const digest = crypto
            .createHash('sha256')
            .update(verifier)
            .digest('base64')
            .toString();
        const challenge = base64URL(digest);
        const zoomApp = {
            host: process.env.ZOOM_APP_HOST,
            clientId: process.env.ZOOM_CLIENT_ID,
            redirectUrl: process.env.ZOOM_REDIRECT_URL,
        };
        const url = new URL('/oauth/authorize', zoomApp.host);
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('client_id', zoomApp.clientId);
        url.searchParams.set('redirect_uri', zoomApp.redirectUrl);
        url.searchParams.set('code_challenge', challenge);
        url.searchParams.set('code_challenge_method', 'S256');
        url.searchParams.set('state', state);
        return { url, state, verifier };
    }
    async getToken(code, clientId, clientSecret, redirectUrl) {
        const buffer = Buffer.from(clientId + ':' + clientSecret);
        const response = await (0, node_fetch_1.default)(`${process.env.ZOOM_APP_HOST}/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${buffer.toString('base64')}`,
            },
        });
        if (!response.ok) {
            throw new common_1.BadRequestException('Token is not generated correctly!');
        }
        const data = await response.json();
        return data.access_token;
    }
    async getUserInfo(token) {
        const response = await (0, node_fetch_1.default)(`${process.env.ZOOM_API_URL}users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    }
};
__decorate([
    (0, common_1.Get)('/:code'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "auth", null);
__decorate([
    (0, common_1.Get)('zoom/deeplink/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getDeepLink", null);
__decorate([
    (0, common_1.Get)('zoom/installurl'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getInstallUrl", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map