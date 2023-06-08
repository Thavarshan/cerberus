<?php

namespace Cerberus\Contracts\Auth;

use Cerberus\Auth\Tokens\Token;

interface Tokenable
{
    /**
     * Set user's auth token.
     *
     * @param \Cerberus\Auth\Tokens\Token $token
     *
     * @return void
     */
    public function setToken(Token $token): void;

    /**
     * Get user's auth token.
     *
     * @return string
     */
    public function getToken(): string;
}
