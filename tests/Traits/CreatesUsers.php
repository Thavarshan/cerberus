<?php

namespace Cerberus\Tests\Traits;

use Cerberus\Users\Models\User;

trait CreatesUsers
{
    /**
     * Create test users for the test case.
     *
     * @param int   $count
     * @param array $overrides
     *
     * @return mixed
     */
    public function createUser(int $count = null, array $overrides = []): mixed
    {
        return create(User::class, $overrides, null, $count);
    }
}
