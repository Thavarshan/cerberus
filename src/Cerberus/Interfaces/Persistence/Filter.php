<?php

namespace Cerberus\Interfaces\Persistence;

use Illuminate\Contracts\Database\Query\Builder;

interface Filter
{
    /**
     * Apply the filters to database queries.
     *
     * @param \Illuminate\Contracts\Database\Query\Builder $builder
     *
     * @return \Illuminate\Contracts\Database\Query\Builder
     */
    public function apply(Builder $builder): Builder;
}
