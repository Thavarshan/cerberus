<?php

namespace Cerberus\Auth\Exceptions;

use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Support\Responsable;

class TokenExpiredException extends \Exception implements Responsable
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
        return new JsonResponse('Token expired', 401);
    }
}
