<?php

namespace Cerberus\Users\Http\Responses;

use Illuminate\Http\JsonResponse;
use Cerberus\Contracts\Shared\Responsable;
use Cerberus\Shared\Http\Responses\Response;

class UserCollectionResponse extends Response implements Responsable
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
