<?php

namespace Cerberus\Contracts;

use Illuminate\Contracts\Database\Eloquent\Builder;

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
