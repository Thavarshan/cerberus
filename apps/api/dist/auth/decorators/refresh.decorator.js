"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const common_1 = require("@nestjs/common");
exports.RefreshToken = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.body['refresh_token'];
});
//# sourceMappingURL=refresh.decorator.js.map