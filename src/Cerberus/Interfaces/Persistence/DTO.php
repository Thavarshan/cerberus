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
}
