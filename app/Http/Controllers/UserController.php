<?php

namespace App\Http\Controllers;

use Cerberus\Interfaces\Users\User;
use Cerberus\Users\DTO\StoreUserDTO;
use Cerberus\Users\DTO\UpdateUserDTO;
use App\Http\Responses\GetUserResponse;
use App\Http\Responses\StoreUserResponse;
use Cerberus\Interfaces\Users\UserFilter;
use App\Http\Responses\DeleteUserResponse;
use App\Http\Responses\UpdateUserResponse;
use Cerberus\Interfaces\Users\UserService;
use Illuminate\Contracts\Support\Responsable;
use App\Http\Responses\UserCollectionResponse;

class UserController extends AbstractController
{
    /**
     * Create a new controller instance.
     *
     * @param \Cerberus\Interfaces\Users\UserService $service
     *
     * @return void
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
     * Get a listing of users with filters applied.
     *
     * @param \Cerberus\Interfaces\Users\UserFilter $filter
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function index(UserFilter $filter): Responsable
    {
        $users = $this->service->list($filter);

        return UserCollectionResponse::dispatch($users);
    }

    /**
     * Get currently authenticated user.
     *
     * @param \Cerberus\Users\Models\User $user
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function show(User $user): Responsable
    {
        return GetUserResponse::dispatch($user);
    }

    /**
     * Create a new user.
     *
     * @param \Cerberus\Users\DTO\StoreUserDTO $dto
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function store(StoreUserDTO $dto): Responsable
    {
        $user = $this->service->create($dto);

        return StoreUserResponse::dispatch($user);
    }

    /**
     * Update an existing user.
     *
     * @param \Cerberus\Users\Models\User       $user
     * @param \Cerberus\Users\DTO\UpdateUserDTO $dto
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function update(User $user, UpdateUserDTO $dto): Responsable
    {
        $user = $this->service->update($user, $dto);

        return UpdateUserResponse::dispatch($user);
    }

    /**
     * Delete an existing user.
     *
     * @param \Cerberus\Users\Models\User $user
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function destroy(User $user): Responsable
    {
        $this->service->delete($user);

        return DeleteUserResponse::dispatch();
    }
}
