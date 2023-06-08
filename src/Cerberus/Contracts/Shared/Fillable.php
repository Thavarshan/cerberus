<?php

namespace Cerberus\Contracts\Shared;

interface Fillable
{
    /**
     * Get the fillable attributes for the model.
     *
     * @return array<string>
     */
    public function getFillable();

    /**
     * Set the fillable attributes for the model.
     *
     * @param array<string> $fillable
     *
     * @return $this
     */
    public function fillable(array $fillable);

    /**
     * Merge new fillable attributes with existing fillable attributes on the model.
     *
     * @param array<string> $fillable
     *
     * @return $this
     */
    public function mergeFillable(array $fillable);
}
