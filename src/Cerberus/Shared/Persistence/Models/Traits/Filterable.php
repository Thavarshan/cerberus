<?php

namespace Cerberus\Shared\Persistence\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Cerberus\Interfaces\Persistence\Filter;

trait Filterable
{
    /**
     * Apply all relevant filters to model queries.
     *
     * @param \Cerberus\Interfaces\Persistence\Filter $filters
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function filter(Filter $filters): Builder
    {
        return $filters->apply($this->query());
    }
}
