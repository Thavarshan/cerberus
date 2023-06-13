<?php

namespace App\Exceptions;

class InvalidResponseTypeException extends \Exception
{
    /**
     * Throw new InvalidResponseTypeException.
     *
     * @return \Throwable
     */
    public static function throw(): \Throwable
    {
        return new static('Response must implement Responsable interface.');
    }
}
