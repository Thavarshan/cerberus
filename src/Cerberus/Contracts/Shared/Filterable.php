<?php

namespace Cerberus\Contracts\Shared;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Cerberus\Shared\Persistence\Filters\AbstractFilter;

interface Filterable
{
    /**
     * Apply all relevant space filters.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Cerberus\Contracts\AbstractFilter    $filters
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilter($query, AbstractFilter $filters): Builder;
}
