<?php

namespace Cerberus\Users\Filters;

use Cerberus\Contracts\AbstractFilter;

class UserFilter extends AbstractFilter
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'email',
        'username',
    ];

    /**
     * Filter users by email.
     *
     * @param string $email
     *
     * @return void
     */
    protected function email(string $email): void
    {
        $this->builder->where('email', $email);
    }

    /**
     * Filter users by username.
     *
     * @param string $username
     *
     * @return void
     */
    protected function username(string $username): void
    {
        $this->builder->where('username', $username);
    }
}
