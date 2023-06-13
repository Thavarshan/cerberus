<?php

namespace App\Http\Controllers;

use Cerberus\Interfaces\Users\User;
use App\Http\Responses\GetUserResponse;
use Cerberus\Interfaces\Users\UserService;
use Illuminate\Contracts\Support\Responsable;

class UserController extends AbstractController
{
    /**
     * The user service instance.
     *
     * @var \Cerberus\Interfaces\Users\UserService
     */
    protected $service;

    /**
     * Create a new controller instance.
     *
     * @param \Cerberus\Interfaces\Users\UserService $service
     *
     * @return void
     */
    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * Get specific user.
     *
     * @param \App\Http\Requests\GetUserRequest $request
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function show(User $user): Responsable
    {
        return GetUserResponse::dispatch($user);
    }
}
