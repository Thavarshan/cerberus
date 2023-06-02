<?php

namespace Cerberus\Contracts\Auth;

use Cerberus\Contracts\Users\User;
use Cerberus\Auth\Support\Credentials;

interface AuthService
{
    /**
     * Authenticate user via username/email and password.
     *
     * @param \Cerberus\Auth\Support\Credentials $credentials
     *
     * @return \Cerberus\Contracts\Auth\User
     */
    public function authenticateViaCredentials(Credentials $credentials): User;
}
