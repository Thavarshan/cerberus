"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const logger_service_1 = require("./services/logger.service");
const logger_provider_1 = require("./providers/logger.provider");
class LoggerModule {
    static forRoot() {
        const prefixedLoggerProviders = (0, logger_provider_1.createProviders)();
        return {
            module: LoggerModule,
            providers: [logger_service_1.LoggerService, ...prefixedLoggerProviders],
            exports: [logger_service_1.LoggerService, ...prefixedLoggerProviders],
        };
    }
}
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=logger.module.js.map