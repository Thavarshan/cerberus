<?php

namespace Cerberus\Contracts;

use Cerberus\Support\Fillable;
use App\Exceptions\JsonEncodingException;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\Arrayable;

abstract class DTO implements Arrayable, \ArrayAccess, Jsonable, \JsonSerializable
{
    use Fillable;

    /**
     * The attributes that are specific to this DTO.
     *
     * @var array<string>
     */
    protected $fillable = [];

    /**
     * The values that are specific to this DTO.
     *
     * @var array<string>
     */
    protected $attributes = [];

    /**
     * Create a new DTO instance.
     *
     * @param array<string> $attributes
     *
     * @return void
     */
    public function __construct(array $attributes)
    {
        $this->attributes = $this->filterFillable($attributes);
    }

    /**
     * Get the attributes that are specific to this DTO.
     *
     * @return array<string>
     */
    public function getFillable(): array
    {
        return $this->fillable;
    }

    /**
     * Get the instance as an array.
     *
     * @return array<TKey, TValue>
     */
    public function toArray(): array
    {
        return $this->attributes;
    }

    /**
     * Specify data which should be serialized to JSON.
     *
     * @return mixed
     */
    public function jsonSerialize(): mixed
    {
        return $this->toArray();
    }

    /**
     * Convert the object to its JSON representation.
     *
     * @param int $options
     *
     * @return string
     */
    public function toJson($options = 0)
    {
        $json = json_encode($this->jsonSerialize(), $options);

        if (\JSON_ERROR_NONE !== json_last_error()) {
            throw JsonEncodingException::forDTO($this, json_last_error_msg());
        }

        return $json;
    }

    /**
     * Determine if the given attribute exists.
     *
     * @param mixed $offset
     *
     * @return bool
     */
    public function offsetExists($offset): bool
    {
        return array_key_exists($offset, $this->attributes);
    }

    /**
     * Get the value for a given offset.
     *
     * @param mixed $offset
     *
     * @return mixed
     */
    public function offsetGet($offset): mixed
    {
        return $this->attributes[$offset];
    }

    /**
     * Set the value for a given offset.
     *
     * @param mixed $offset
     * @param mixed $value
     *
     * @return void
     */
    public function offsetSet($offset, $value): void
    {
        $this->attributes[$offset] = $value;
    }

    /**
     * Unset the value for a given offset.
     *
     * @param mixed $offset
     *
     * @return void
     */
    public function offsetUnset($offset): void
    {
        unset($this->attributes[$offset]);
    }
}
