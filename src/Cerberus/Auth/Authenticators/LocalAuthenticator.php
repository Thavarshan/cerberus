<?php

namespace Cerberus\Auth\Authenticators;

use Cerberus\Contracts\Users\User;
use Cerberus\Auth\Support\Credentials;
use Cerberus\Contracts\Auth\Authenticator;
use Illuminate\Contracts\Auth\StatefulGuard;
use Cerberus\Auth\Authenticators\Authenticator as AbstractAuthenticator;

class LocalAuthenticator extends AbstractAuthenticator implements Authenticator
{
    /**
     * Create a new authenticator instance.
     *
     * @param \Illuminate\Contracts\Auth\StatefulGuard $guard
     *
     * @return void
     */
    public function __construct(StatefulGuard $guard)
    {
        parent::__construct($guard);
    }

    /**
     * Authenticate a user using the given credentials.
     *
     * @param \Cerberus\Auth\Support\Credentials $credentials
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function authenticate(Credentials $credentials): User
    {
        $this->guard->attempt(
            credentials: $credentials->local(),
            remember: false
        );

        return $this->guard->user();
    }
}
