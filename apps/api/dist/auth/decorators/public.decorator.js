"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const auth_enum_1 = require("../enums/auth.enum");
const Public = () => (0, common_1.SetMetadata)(auth_enum_1.Auth.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map