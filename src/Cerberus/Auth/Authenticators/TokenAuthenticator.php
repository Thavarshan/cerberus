<?php

namespace Cerberus\Auth\Authenticators;

use Cerberus\Contracts\Users\User;
use Illuminate\Contracts\Auth\Guard;
use Cerberus\Auth\Support\Credentials;
use Cerberus\Contracts\Auth\Authenticator;
use Illuminate\Contracts\Auth\StatefulGuard;
use Cerberus\Auth\Authenticators\Authenticator as AbstractAuthenticator;

class TokenAuthenticator extends AbstractAuthenticator implements Authenticator
{
    /**
     * The number of minutes tokens should be allowed to remain valid.
     *
     * @var int
     */
    protected $expiration;

    /**
     * Create a new guard instance.
     *
     * @param \Illuminate\Contracts\Auth\StatefulGuard $guard
     * @param int                                      $expiration
     *
     * @return void
     */
    public function __construct(StatefulGuard $guard, $expiration = null)
    {
        parent::__construct($guard);

        $this->expiration = $expiration;
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
    }
}
