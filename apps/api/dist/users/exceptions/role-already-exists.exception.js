"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class RoleAlreadyExistsException extends common_1.BadRequestException {
    constructor(key, value) {
        super(`Role with ${key} [${value}] already exists.`);
    }
}
exports.RoleAlreadyExistsException = RoleAlreadyExistsException;
//# sourceMappingURL=role-already-exists.exception.js.map