"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const refresh_session_entity_1 = require("../../auth/entities/refresh-session.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const role_entity_1 = require("../../users/entities/role.entity");
exports.entities = [
    user_entity_1.User,
    refresh_session_entity_1.RefreshSession,
    role_entity_1.Role
];
//# sourceMappingURL=entities.manifest.js.map