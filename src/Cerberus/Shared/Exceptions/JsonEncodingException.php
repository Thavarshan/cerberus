<?php

namespace Cerberus\Shared\Exceptions;

use Cerberus\Contracts\DTO;
use Illuminate\Database\Eloquent\JsonEncodingException as EloquentJsonEncodingException;

class JsonEncodingException extends EloquentJsonEncodingException
{
    /**
     * Create a new JSON encoding exception for the dto.
     *
     * @param mixed  $dto
     * @param string $message
     *
     * @return static
     */
    public static function forDTO(DTO $dto, string $message): static
    {
        // phpcs:ignore
        return new static('Error encoding dto [' . get_class($dto) . '] to JSON: ' . $message);
    }
}
