"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = exports.SESSION_STORE = void 0;
const common_1 = require("@nestjs/common");
const express_session_1 = require("express-session");
exports.SESSION_STORE = 'SESSION_STORE';
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.SESSION_STORE,
                useFactory: () => {
                    return new express_session_1.MemoryStore();
                },
            },
        ],
        exports: [exports.SESSION_STORE],
    })
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.module.js.map