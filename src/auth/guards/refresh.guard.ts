import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    /**
     * Create new instance of RefreshTokenGuard.
     *
     * @returns {void}
     */
    constructor () { super(); }
}
