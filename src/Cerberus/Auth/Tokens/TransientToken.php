<?php

namespace Cerberus\Auth\Tokens;

use Illuminate\Support\Str;

class TransientToken extends Token
{
    public function __construct()
    {
        parent::__construct(Str::random(60));
    }
}
