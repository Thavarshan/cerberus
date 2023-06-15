<?php

namespace App\Http\Controllers;

use Cerberus\Users\DTO\StoreUserDTO;
use Illuminate\Contracts\Support\Responsable;

class RegisterController extends UserController
{
    /**
     * Register a new user.
     *
     * @param \Cerberus\Users\DTO\StoreUserDTO $dto
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function __invoke(StoreUserDTO $dto): Responsable
    {
        return $this->store($dto);
    }
}
