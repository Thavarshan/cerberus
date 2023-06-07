<?php

namespace Cerberus\Tests\Concerns;

trait AuthenticatesUser
{
    /**
     * Create and set the currently logged in user for the application.
     *
     * @param mixed|null  $user
     * @param array[]     $overrides
     * @param string|null $as
     *
     * @return mixed
     */
    public function signIn($user = null, array $overrides = [], string $as = null)
    {
        $class = config('auth.providers.users.model');

        $user = $user ?: create($class::class, $overrides, $as);

        return $this->actingAs($user);
    }
}
