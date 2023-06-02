<?php

namespace Cerberus\Auth\Exceptions;

use Illuminate\Http\Request;

class InvalidCredentialsException extends \Exception
{
    /**
     * Create a new exception instance.
     *
     * @param string $email
     *
     * @return void
     */
    public function __construct(string $email)
    {
        parent::__construct("User with email {$email} not found.");
    }

    /**
     * Create a new exception instance.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function toResponse(Request $request)
    {
        // code...
    }
}
