<?php

namespace Cerberus\Interfaces\Persistence;

use Illuminate\Database\Eloquent\Builder;

interface Filter
{
    /**
     * Apply the filters to database queries.
     *
     * @param \Illuminate\Database\Eloquent\Builder $builder
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(Builder $builder): Builder;
}
