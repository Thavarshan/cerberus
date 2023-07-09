export interface Token {
    /**
     * Genaret a new access/refresh token.
     *
     * @returns {Promise<string>}
     */
    generate (): Promise<string>;
}
