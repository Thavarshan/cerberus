<?php

namespace App\Http\Requests\Traits;

use App\Support\Credentials;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Cerberus\Interfaces\Users\UserService;
use Cerberus\Users\Exceptions\UserNotFoundException;

trait AuthorizesRequests
{
    /**
     * Determine if the user making the request is a guest.
     *
     * @return bool
     */
    public function isGuest(): bool
    {
        return is_null($this->user());
    }

    /**
     * Determine if the user making the request is authenticated and is the currently authenticated user.
     *
     * @param mixed|null $role
     *
     * @return bool
     */
    public function isAuthenticated($role = null): bool
    {
        $authenticated = ! is_null($this->user())
            && $this->user()->is(Auth::user());

        // if (! is_null($role)) {
        //     return $this->user()->hasRole($role) && $authenticated;
        // }

        return $authenticated;
    }

    /**
     * Determine if the user making the request is authorized to perform given action on resource.
     *
     * @param string $ability
     * @param mixed  $arguments
     *
     * @return bool
     */
    public function isAllowed(
        string $ability,
        mixed $arguments = [],
        bool $withoutAuthentication = true
    ): bool {
        if ($this->isAuthenticated() || $withoutAuthentication) {
            return Gate::allows($ability, $arguments);
        }

        return false;
    }

    /**
     * Determine if a user with given email address exists in the database.
     *
     * @return bool
     */
    public function isUser(): bool
    {
        try {
            tap(Credentials::username(), function (
                string $username
            ): void {
                app(UserService::class)->findBy(
                    $username,
                    $this->input($username)
                );
            });
        } catch (UserNotFoundException $e) {
            return false;
        }

        return true;
    }
}
