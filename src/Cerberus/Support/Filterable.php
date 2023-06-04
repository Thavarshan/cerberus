<?php

namespace Cerberus\Support;

use Cerberus\Contracts\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

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
