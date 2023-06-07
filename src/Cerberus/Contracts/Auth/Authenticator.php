<?php

namespace Cerberus\Contracts\Auth;

use Cerberus\Contracts\Users\User;
use Illuminate\Contracts\Auth\Guard;
use Cerberus\Auth\Support\Credentials;

interface Authenticator
{
    /**
     * Authenticate a user using the given credentials.
     *
     * @param \Cerberus\Auth\Support\Credentials $credentials
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function authenticate(Credentials $credentials): User;

    /**
     * Get the guard instance.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard(): Guard;

    /**
     * Logout user.
     *
     * @return void
     */
    public function logout(): void;
}
