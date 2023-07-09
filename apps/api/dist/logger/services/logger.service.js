"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
let LoggerService = exports.LoggerService = class LoggerService {
    constructor() {
        this.levels = [
            'log',
            'info',
            'warn',
            'error'
        ];
    }
    log(message, ...optionalParams) {
        this.performLog(message, 'log');
    }
    error(message, ...optionalParams) {
        this.performLog(message, 'error');
    }
    warn(message, ...optionalParams) {
        this.performLog(message, 'warn');
    }
    debug(message, ...optionalParams) {
        this.performLog(message, 'debug');
    }
    verbose(message, ...optionalParams) {
    }
    performLog(message, level) {
        if (!this.levels.includes(level)) {
            throw new Error(`Invalid log level [${level}] set.`);
        }
        let formattedMessage = message;
        if (this.prefix) {
            formattedMessage = `[${this.prefix}] ${message}`;
        }
        console[level](formattedMessage);
    }
    setPrefix(prefix) {
        this.prefix = prefix;
    }
};
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.TRANSIENT,
    })
], LoggerService);
//# sourceMappingURL=logger.service.js.map