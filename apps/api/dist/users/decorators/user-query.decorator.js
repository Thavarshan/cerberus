"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = void 0;
const filter_1 = require("../../shared/filter");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
exports.UserQuery = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const query = filter_1.Filter.getQueryFilters(request.query, user_entity_1.User.filterKeys);
    return data ? query === null || query === void 0 ? void 0 : query[data] : query;
});
//# sourceMappingURL=user-query.decorator.js.map