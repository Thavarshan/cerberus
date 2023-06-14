<?php

namespace Cerberus\Interfaces\Users;

use Cerberus\Interfaces\Persistence\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

// @phpcs:ignore
interface User extends Model, AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
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

    /**
     * Find user by username.
     *
     * @param string $username
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function findByUsername(string $username): ?User;
}
