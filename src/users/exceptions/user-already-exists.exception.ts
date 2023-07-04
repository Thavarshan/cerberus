import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
    /**
     * Create new UserAlreadyExistsException instance.
     *
     * @param {string} key
     * @param {string} value
     *
     * @returns {void}
     */
    constructor (key: string, value: string) {
        super(`User with ${key} [${value}] already exists.`);
    }
}
