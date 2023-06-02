<?php

namespace Cerberus\Users\Repositories;

use Cerberus\Users\Models\User;
use Cerberus\Contracts\AbstractRepository;
use Cerberus\Contracts\Users\User as UserInterface;
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
}
