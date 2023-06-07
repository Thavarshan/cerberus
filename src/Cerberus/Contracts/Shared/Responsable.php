<?php

namespace Cerberus\Contracts\Shared;

use Illuminate\Contracts\Support\Responsable as IlluminateResponsable;

interface Responsable extends IlluminateResponsable
{
    /**
     * Make a new response.
     *
     * @return mixed
     */
    public function content(): mixed;
}
