<?php

namespace Cerberus\Auth\Services;

use App\Support\Credentials;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Validation\ValidationException;
use Cerberus\Interfaces\Auth\AuthService as AuthServiceInterface;

class AuthService implements AuthServiceInterface
{
    /**
     * The authentication guard instance.
     *
     * @var \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected $guard;

    /**
     * Create a new authentication service instance.
     *
     * @param \Illuminate\Contracts\Auth\StatefulGuard $guard
     *
     * @return void
     */
    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    /**
     * Authenticate user via username/email and password.
     *
     * @param \App\Support\Credentials $credentials
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(Credentials $credentials): Authenticatable
    {
        $isAuthenticated = $this->guard->attempt(
            $credentials->only([Credentials::username(), 'password'])
        );

        if (! $isAuthenticated) {
            $this->throwFailedAuthenticationException();
        }

        return $this->guard->user();
    }

    /**
     * Throw a failed authentication validation exception.
     *
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function throwFailedAuthenticationException(): void
    {
        throw ValidationException::withMessages([Credentials::username() => [trans('auth.failed')]]); // phpcs:ignore
    }

    /**
     * Logout user.
     *
     * @return void
     */
    public function logout(): void
    {
        $this->guard->logout();
    }
}
