<?php

namespace Cerberus\Auth\Authenticators;

use Illuminate\Contracts\Auth\Guard;

abstract class Authenticator
{
    /**
     * The auth guard implementation.
     *
     * @var \Illuminate\Contracts\Auth\Guard
     */
    protected $guard;

    /**
     * Create a new authenticator instance.
     *
     * @param \Illuminate\Contracts\Auth\Guard $guard
     *
     * @return void
     */
    public function __construct(Guard $guard)
    {
        $this->guard = $guard;
    }
}
