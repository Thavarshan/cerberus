<?php

namespace Cerberus\Contracts\Users;

interface UserFilter
{
    /**
     * Filter users by email.
     *
     * @param string $email
     *
     * @return void
     */
    public function email(string $email): void;

    /**
     * Filter users by username.
     *
     * @param string $username
     *
     * @return void
     */
    public function username(string $username): void;
}
