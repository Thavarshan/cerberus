<?php

namespace Cerberus\Users\Http\Controllers;

use Cerberus\Users\DTO\UserDTO;
use Illuminate\Http\JsonResponse;
use Cerberus\Contracts\Users\User;
use Illuminate\Routing\Controller;
use Cerberus\Contracts\Users\UserService;

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
     * Get all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = $this->service->all();

        return new JsonResponse($users);
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
     * @param \Cerberus\Users\DTO\UserDTO $dto
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserDTO $dto): JsonResponse
    {
        $user = $this->service->create($dto);

        return new JsonResponse($user);
    }

    /**
     * Update an existing user.
     *
     * @param \Cerberus\Users\Models\User $user
     * @param \Cerberus\Users\DTO\UserDTO $dto
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(User $user, UserDTO $dto): JsonResponse
    {
        $user = $this->service->update($user, $dto);

        return new JsonResponse($user);
    }

    /**
     * Delete an existing user.
     *
     * @param \Cerberus\Users\Models\User $user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(User $user): JsonResponse
    {
        $this->service->delete($user);

        return new JsonResponse(null, 204);
    }
}
