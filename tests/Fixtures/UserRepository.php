<?php

namespace Cerberus\Tests\Fixtures;

use Cerberus\Contracts\Users\User as UserInterface;
use Cerberus\Contracts\Users\UserRepository as UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email): UserInterface
    {
        return new User([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => 'Password123!',
        ]);
    }
}
