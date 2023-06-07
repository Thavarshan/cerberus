<?php

namespace Cerberus\Shared\Persistence\Filters\Traits;

use Illuminate\Database\Eloquent\Builder;
use Cerberus\Shared\Persistence\Filters\AbstractFilter;

trait Filterable
{
    /**
     * Apply all relevant space filters.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Cerberus\Contracts\AbstractFilter    $filters
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilter($query, AbstractFilter $filters): Builder
    {
        return $filters->apply($query);
    }
}
