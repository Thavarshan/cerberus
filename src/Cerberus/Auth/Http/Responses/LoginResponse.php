<?php

namespace Cerberus\Auth\Http\Responses;

use Illuminate\Http\JsonResponse;
use Cerberus\Shared\Http\Responses\Response;
use Illuminate\Contracts\Support\Responsable;

class LoginResponse extends Response implements Responsable
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        return new JsonResponse($this->content);
    }
}
