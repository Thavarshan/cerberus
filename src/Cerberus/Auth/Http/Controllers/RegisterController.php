<?php

namespace Cerberus\Auth\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Cerberus\Users\Http\Requests\UserRequest;
use Cerberus\Users\Http\Controllers\UserController;

class RegisterController extends UserController
{
    /**
     * Register a new user.
     *
     * @param \Cerberus\Users\Http\Requests\UserRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRequest $request): JsonResponse
    {
        return $this->store($request);
    }
}
