<?php

namespace Cerberus\Interfaces\Auth;

use App\Support\Credentials;
use Illuminate\Contracts\Auth\Authenticatable;

interface AuthService
{
    /**
     * Authenticate user via username/email and password.
     *
     * @param \App\Support\Credentials $credentials
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function authenticate(Credentials $credentials): Authenticatable;

    /**
     * Logout user.
     *
     * @return void
     */
    public function logout(): void;
}
