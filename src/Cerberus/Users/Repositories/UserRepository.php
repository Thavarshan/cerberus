<?php

namespace Cerberus\Users\Repositories;

use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Cerberus\Contracts\Users\UserFilter;
use Cerberus\Contracts\Users\User as UserInterface;
use Cerberus\Shared\Persistence\Repositories\AbstractRepository;
use Cerberus\Contracts\Users\UserRepository as UserRepositoryInterface;

class UserRepository extends AbstractRepository implements UserRepositoryInterface
{
    /**
     * Create a new repository instance.
     *
     * @param \Cerberus\Users\Models\User $model
     *
     * @return void
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * Get a listing of users with filters applied.
     *
     * @param \Cerberus\Contracts\Users\UserFilter $filter
     *
     * @return \Illuminate\Support\Collection
     */
    public function list(UserFilter $filter): Collection
    {
        return $this->model->filter($filter)->get();
    }

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Contracts\Users\User|null
     */
    public function findByEmail(string $email): UserInterface|null
    {
        return $this->model->whereEmail($email);
    }

    /**
     * Find a user by their ID.
     *
     * @param int|string $id
     *
     * @return \Cerberus\Contracts\Users\User|null
     */
    public function find(int|string $id): ?UserInterface
    {
        return $this->model->find($id);
    }

    /**
     * Find a user by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function findBy(string $key, string $value): ?UserInterface
    {
        return $this->model->where($key, $value)->first();
    }

    /**
     * Create a new user.
     *
     * @param \Cerberus\Users\DTO\UserDTO $dto
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function create(UserDTO $dto): UserInterface
    {
        return DB::transaction(function () use ($dto) {
            return $this->model->create($dto->toArray());
        });
    }

    /**
     * Update an existing user.
     *
     * @param \Cerberus\Contracts\Users\User $user
     * @param \Cerberus\Users\DTO\UserDTO    $dto
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function update(UserInterface $user, UserDTO $dto): UserInterface
    {
        tap($user, function (UserInterface $user) use ($dto) {
            $instance = $this->model->find($user->getId());

            $instance->update($dto->toArray());
        });

        $user->refresh();

        return $user;
    }

    /**
     * Delete an existing user.
     *
     * @param \Cerberus\Contracts\Users\User $user
     *
     * @return void
     */
    public function delete(UserInterface $user): void
    {
        tap($user->getId(), function (int $id) {
            $instance = $this->model->find($id);

            $instance->delete();
        });
    }
}
