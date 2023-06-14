<?php

namespace Cerberus\Interfaces\Persistence;

use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\Arrayable;

interface DTO extends Arrayable, \ArrayAccess, Jsonable, \JsonSerializable, Fillable
{
    /**
     * Get all of the input items in the object.
     *
     * @return array
     */
    public function all(): array;

    /**
     * Get the specified configuration value.
     *
     * @param string $key
     * @param mixed  $default
     *
     * @return mixed
     */
    public function get(string $key, mixed $default = null): mixed;

    /**
     * Set a given configuration value.
     *
     * @param string $key
     * @param mixed  $value
     *
     * @return void
     */
    public function set(string $key, mixed $value = null): void;
}
