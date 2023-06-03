<?php

namespace Cerberus\Auth\Http\Responses;

use Illuminate\Http\JsonResponse;
use Cerberus\Contracts\Users\User;
use Symfony\Component\HttpFoundation\Response;

class SigninResponse
{
    /**
     * Make a new signin response.
     *
     * @param \Cerberus\Contracts\Users\User $user
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public static function make(User $user): Response
    {
        return new JsonResponse($user);
    }
}
