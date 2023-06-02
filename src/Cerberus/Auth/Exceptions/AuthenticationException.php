<?php

namespace Cerberus\Auth\Exceptions;

use Illuminate\Auth\AuthenticationException as BaseAuthenticationException;

class AuthenticationException extends BaseAuthenticationException
{
    /**
     * Create a new exception instance.
     *
     * @param \Cerberus\Contracts\Users\User $user
     *
     * @return void
     */
    public function __construct($user)
    {
        parent::__construct();
    }
}
