<?php

namespace App\Support;

use Illuminate\Support\Arr;
use Cerberus\Auth\Config\Auth;
use Illuminate\Config\Repository;
use Illuminate\Contracts\Config\Repository as CredentialsInterface;

final class Credentials extends Repository implements CredentialsInterface
{
    /**
     * Get the name of the username attribute from the request.
     *
     * @return string
     */
    public static function username(): string
    {
        /* @php-stan-ignore-next-line */
        return Auth::credentials('username');
    }

    /**
     * Get the name of the username attribute from the request.
     *
     * @return string
     */
    public function getUsername(): string
    {
        return $this->get(static::username(), 'email');
    }

    /**
     * Get a subset containing the provided keys with values from the input data.
     *
     * @param array $keys
     *
     * @return array
     */
    public function only(array $keys): array
    {
        return Arr::only($this->all(), $keys);
    }

    /**
     * Retrieve input as a boolean value.
     *
     * Returns true when value is "1", "true", "on", and "yes". Otherwise, returns false.
     *
     * @param string|null $key
     * @param bool        $default
     *
     * @return bool
     */
    public function boolean(string $key = null, bool $default = false): bool
    {
        return filter_var(
            $this->get($key, $default),
            \FILTER_VALIDATE_BOOLEAN
        );
    }
}
