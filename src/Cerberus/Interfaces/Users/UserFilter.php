<?php

namespace Cerberus\Interfaces\Users;

use DeepCopy\Filter\Filter;
use Illuminate\Contracts\Database\Query\Builder;

interface UserFilter extends Filter
{
    /**
     * Filter by user's email.
     *
     * @param string $email
     *
     * @return \Cerberus\Interfaces\Users\UserFilter
     */
    public function email(string $email): Builder;

    /**
     * Filter by user's username.
     *
     * @param string $username
     *
     * @return \Cerberus\Interfaces\Users\UserFilter
     */
    public function username(string $username): Builder;
}
