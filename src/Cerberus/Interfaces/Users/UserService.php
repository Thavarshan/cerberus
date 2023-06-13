<?php

namespace Cerberus\Interfaces\Users;

interface UserService
{
    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByEmail(string $email): ?User;
}
