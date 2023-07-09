"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
class RefreshToken {
    constructor(config, jwt, user) {
        this.config = config;
        this.jwt = jwt;
        this.user = user;
    }
    async generate() {
        return await this.jwt.signAsync({
            sub: this.user.id,
            username: this.user.email
        }, {
            expiresIn: '30d',
        });
    }
}
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refresh.token.js.map