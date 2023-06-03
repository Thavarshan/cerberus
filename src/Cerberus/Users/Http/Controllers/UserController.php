<?php

namespace Cerberus\Users\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Cerberus\Contracts\Users\User;
use Illuminate\Routing\Controller;
use Cerberus\Contracts\Users\UserService;
use Cerberus\Users\Http\Requests\UserRequest;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param \Cerberus\Contracts\Users\UserService $service
     *
     * @return void
     */
    protected $service;

    /**
     * Create a new controller instance.
     *
     * @param \Cerberus\Contracts\Users\UserService $service
     *
     * @return void
     */
    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * Get currently authenticated user.
     *
     * @param \Cerberus\Users\Models\User $user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        return new JsonResponse($user);
    }

    /**
     * Create a new user.
     *
     * @param \Cerberus\Users\Http\Requests\UserRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request): JsonResponse
    {
        $user = $this->service->create($request->validated());

        return new JsonResponse($user);
    }
}
