<?php

namespace Cerberus\Users\Services;

use Cerberus\Contracts\Users\User;
use Cerberus\Contracts\AbstractService;
use Cerberus\Contracts\Users\UserRepository;
use Cerberus\Users\Exceptions\UserNotFoundException;
use Cerberus\Contracts\Users\UserService as UserServiceInterface;

class UserService extends AbstractService implements UserServiceInterface
{
    /**
     * The repository instance.
     *
     * @var \Cerberus\Contracts\Users\UserRepository
     */
    protected $repository;

    /**
     * Create a new service instance.
     *
     * @param \Cerberus\Contracts\Users\UserRepository $repository
     *
     * @return void
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Find a user by their email address.
     *
     * @param string $email
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function findByEmail(string $email): User
    {
        if ($user = $this->repository->findByEmail($email)) {
            return $user;
        }

        throw UserNotFoundException::withEmail($email);
    }

    /**
     * Find a user by their ID.
     *
     * @param int|string $id
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function find(int|string $id): User
    {
        if ($user = $this->repository->find($id)) {
            return $user;
        }

        throw UserNotFoundException::withId($id);
    }

    /**
     * Find a user by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function findBy(string $key, string $value): User
    {
        if ($user = $this->repository->findBy($key, $value)) {
            return $user;
        }

        throw UserNotFoundException::withKey($key, $value);
    }
}
