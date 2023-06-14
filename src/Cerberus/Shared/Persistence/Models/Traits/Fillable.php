<?php

namespace Cerberus\Shared\Persistence\Models\Traits;

trait Fillable
{
    /**
     * Filter and etract only data allowable to be changed.
     *
     * @param array                                           $data
     * @param \Illuminate\Database\Eloquent\Model|string|null $resource
     *
     * @return array
     */
    public function filterFillable(array $data, mixed $resource = null): array
    {
        if (is_null($resource)) {
            $resource = $this;
        }

        if (is_string($resource)) {
            $resource = new $resource();
        }

        $data = array_filter(
            $data,
            function (string $key): bool {
                return in_array($key, $this->getFillable(), true);
            },
            \ARRAY_FILTER_USE_KEY
        );

        unset($data['id']);

        return $data;
    }
}
