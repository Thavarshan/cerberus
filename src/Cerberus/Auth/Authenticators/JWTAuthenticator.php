<?php

namespace Cerberus\Auth\Authenticators;

use Cerberus\Contracts\Users\User;
use Cerberus\Auth\Support\Credentials;
use Cerberus\Contracts\Auth\Authenticator;

class JWTAuthenticator implements Authenticator
{
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
