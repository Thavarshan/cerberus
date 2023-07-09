"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
class AccessToken {
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
            secret: this.config.secretKey,
            expiresIn: '24h',
        });
    }
}
exports.AccessToken = AccessToken;
//# sourceMappingURL=access.token.js.map