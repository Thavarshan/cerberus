<?php

namespace Cerberus\Auth\Exceptions;

use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Support\Responsable;

class InvalidCredentialsException extends \Exception implements Responsable
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
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        return new JsonResponse($this->getMessage(), 422);
    }
}
