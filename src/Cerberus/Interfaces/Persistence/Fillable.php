<?php

namespace Cerberus\Interfaces\Persistence;

interface Fillable
{
    /**
     * Get the fillable attributes for the model.
     *
     * @return array<string>
     */
    public function getFillable();
}
