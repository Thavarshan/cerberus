<?php

namespace Cerberus\Interfaces\Users;

use Cerberus\Interfaces\Persistence\Model;

interface User extends Model
{
    /**
     * Get user's name.
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Get user's username.
     *
     * @return string
     */
    public function getUsername(): string;

    /**
     * Get user's email.
     *
     * @return string
     */
    public function getEmail(): string;

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByEmail(string $email): ?User;
}
