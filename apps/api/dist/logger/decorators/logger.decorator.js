"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.prefixesForLoggers = void 0;
const common_1 = require("@nestjs/common");
exports.prefixesForLoggers = new Array();
const Logger = (prefix) => {
    if (!exports.prefixesForLoggers.includes(prefix)) {
        exports.prefixesForLoggers.push(prefix);
    }
    return (0, common_1.Inject)(`LoggerService${prefix}`);
};
exports.Logger = Logger;
//# sourceMappingURL=logger.decorator.js.map