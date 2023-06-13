<?php

namespace Cerberus\Users\Repositories;

use Illuminate\Support\Collection;
use Cerberus\Interfaces\Users\User;
use Cerberus\Interfaces\Persistence\Filter;
use Cerberus\Shared\Persistence\Repositories\AbstractRepository;
use Cerberus\Interfaces\Users\UserRepository as UserRepositoryInterface;

class UserRepository extends AbstractRepository implements UserRepositoryInterface
{
    /**
     * The model instance.
     *
     * @var \Cerberus\Interfaces\Users\User
     */
    protected $model;

    /**
     * Create a new user repository instance.
     *
     * @param \Cerberus\Interfaces\Users\User $model
     *
     * @return void
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * Get a listing of users with filters applied.
     *
     * @param \Cerberus\Interfaces\Persistence\Filter $filter
     *
     * @return \Illuminate\Support\Collection
     */
    public function list(Filter $filter): Collection
    {
        return $this->model->filter($filter)->get();
    }

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByEmail(string $email): User|null
    {
        return $this->model->findByEmail($email);
    }

    /**
     * Find user by username.
     *
     * @param string $username
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByUsername(string $username): User|null
    {
        return $this->model->findBy('username', $username);
    }
}
