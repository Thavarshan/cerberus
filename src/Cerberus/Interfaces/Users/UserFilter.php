<?php

namespace Cerberus\Interfaces\Users;

use Cerberus\Interfaces\Persistence\Filter;

interface UserFilter extends Filter
{
    /**
     * Filter by user's email.
     *
     * @param string $email
     *
     * @return void
     */
    public function email(string $email): void;

    /**
     * Filter by user's username.
     *
     * @param string $username
     *
     * @return void
     */
    public function username(string $username): void;
}
