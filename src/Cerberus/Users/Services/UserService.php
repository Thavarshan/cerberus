<?php

namespace Cerberus\Users\Services;

use Illuminate\Support\Collection;
use Cerberus\Interfaces\Users\User;
use Cerberus\Users\Filters\UserFilter;
use Cerberus\Users\Exceptions\UserNotFoundException;
use Cerberus\Shared\Persistence\Services\AbstractService;
use Cerberus\Interfaces\Users\UserService as UserServiceInterface;
use Cerberus\Interfaces\Users\UserRepository as UserRepositoryInterface;

class UserService extends AbstractService implements UserServiceInterface
{
    /**
     * The user repository instance.
     *
     * @var \Cerberus\Interfaces\Users\UserRepository
     */
    protected $repository;

    /**
     * Create a new user service instance.
     *
     * @param \Cerberus\Interfaces\Users\UserRepository $repository
     *
     * @return void
     */
    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get a listing of users with filters applied.
     *
     * @param \Cerberus\Users\Filters\UserFilter $filter
     *
     * @return \Illuminate\Support\Collection
     */
    public function list(UserFilter $filter): Collection
    {
        return $this->repository->list($filter);
    }

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByEmail(string $email): ?User
    {
        if ($user = $this->repository->findByEmail($email)) {
            return $user;
        }

        throw UserNotFoundException::withEmail($email);
    }

    /**
     * Find user by username.
     *
     * @param string $username
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByUsername(string $username): ?User
    {
        if ($user = $this->repository->findByUsername($username)) {
            return $user;
        }

        throw UserNotFoundException::withUsername($username);
    }
}
