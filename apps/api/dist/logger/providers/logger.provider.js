"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProviders = void 0;
const logger_service_1 = require("../services/logger.service");
const logger_decorator_1 = require("../decorators/logger.decorator");
const createProviders = () => {
    return logger_decorator_1.prefixesForLoggers.map(prefix => {
        return {
            provide: `LoggerService${prefix}`,
            inject: [logger_service_1.LoggerService],
            useFactory: (service) => {
                if (prefix) {
                    service.setPrefix(prefix);
                }
                return service;
            }
        };
    });
};
exports.createProviders = createProviders;
//# sourceMappingURL=logger.provider.js.map