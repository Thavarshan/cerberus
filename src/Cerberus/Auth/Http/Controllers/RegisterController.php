<?php

namespace Cerberus\Auth\Http\Controllers;

use Cerberus\Users\DTO\UserDTO;
use Illuminate\Http\JsonResponse;
use Cerberus\Users\Http\Controllers\UserController;

class RegisterController extends UserController
{
    /**
     * Register a new user.
     *
     * @param \Cerberus\Users\DTO\UserDTO $dto
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserDTO $dto): JsonResponse
    {
        return $this->store($dto);
    }
}
