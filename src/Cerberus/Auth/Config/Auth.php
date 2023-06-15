<?php

namespace Cerberus\Auth\Config;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;

/**
 * @method static string credentials(string $key)
 * @method static string default(string $key)
 */
final class Auth
{
    /**
     *  Dynamically invoke inaccessible methods in a static context.
     *
     * @param string $name
     * @param mixed  $arguments
     *
     * @return mixed
     */
    public static function __callStatic($name, $arguments)
    {
        $arguments = Arr::first($arguments);

        return Config::get("auth.{$name}.{$arguments}");
    }
}
