<?php

namespace Cerberus\Tests\Fixtures;

use Cerberus\Contracts\Users\User as UserInterface;

class User implements UserInterface
{
    protected $attributes;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }
}
