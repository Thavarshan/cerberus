<?php

namespace Cerberus\Interfaces\Users;

use Illuminate\Support\Collection;
use Cerberus\Interfaces\Persistence\Filter;

interface UserRepository
{
    /**
     * Get a listing of users with filters applied.
     *
     * @param \Cerberus\Interfaces\Persistence\Filter $filter
     *
     * @return \Illuminate\Support\Collection
     */
    public function list(Filter $filter): Collection;

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByEmail(string $email): User|null;

    /**
     * Find user by username.
     *
     * @param string $username
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByUsername(string $username): User|null;
}
