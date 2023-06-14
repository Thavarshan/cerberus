<?php

namespace Cerberus\Shared\Persistence\Models\Traits;

trait HasIdAttribute
{
    /**
     * Boot model trait.
     *
     * @return void
     */
    protected function initializeHasIdAttribute(): void
    {
        $this->mergeFillable(['id']);
    }
}
