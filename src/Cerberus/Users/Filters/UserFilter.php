<?php

namespace Cerberus\Users\Filters;

use Cerberus\Shared\Persistence\Filters\AbstractFilter;
use Cerberus\Contracts\Users\UserFilter as UserFilterInterface;

class UserFilter extends AbstractFilter implements UserFilterInterface
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
    public function email(string $email): void
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
    public function username(string $username): void
    {
        $this->builder->where('username', $username);
    }
}
