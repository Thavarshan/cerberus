<?php

namespace Cerberus\Interfaces\Persistence;

use Illuminate\Database\Eloquent\Builder;

interface Filterable
{
    /**
     * Apply all relevant filters to model queries.
     *
     * @param \Cerberus\Interfaces\Persistence\Filter $filters
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function filter(Filter $filters): Builder;
}
