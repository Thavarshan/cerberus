import { BadRequestException } from '@nestjs/common';

export class RoleAlreadyExistsException extends BadRequestException {
    /**
     * Create new RoleAlreadyExistsException instance.
     *
     * @param {string} key
     * @param {string} value
     *
     * @returns {void}
     */
    constructor (key: string, value: string) {
        super(`Role with ${key} [${value}] already exists.`);
    }
}
