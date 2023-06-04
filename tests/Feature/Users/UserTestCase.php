<?php

namespace Cerberus\Tests\Feature\Users;

use Cerberus\Tests\TestCase;
use Cerberus\Users\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class UserTestCase extends TestCase
{
    use RefreshDatabase;

    /**
     * Create test users for the test case.
     *
     * @param int   $count
     * @param array $overrides
     *
     * @return \Cerberus\Users\Models\User|\Cerberus\Users\Models\User[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function createUser(int $count = null, array $overrides = []): mixed
    {
        return User::factory($count)->create($overrides);
    }
}
