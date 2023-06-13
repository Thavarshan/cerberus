<?php

namespace Cerberus\Interfaces\Users;

use Illuminate\Support\Collection;
use Cerberus\Users\Filters\UserFilter;
use Cerberus\Interfaces\Persistence\Service;

interface UserService extends Service
{
    /**
     * Get a listing of users with filters applied.
     *
     * @param \Cerberus\Users\Filters\UserFilter $filter
     *
     * @return \Illuminate\Support\Collection
     */
    public function list(UserFilter $filter): Collection;

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByEmail(string $email): ?User;

    /**
     * Find user by username.
     *
     * @param string $username
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByUsername(string $username): ?User;
}
