<?php

namespace Cerberus\Tests\Unit\Users;

use Cerberus\Tests\TestCase;
use Cerberus\Users\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * @group Users
 */
class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testGetRouteKeyName(): void
    {
        $user = new User();

        $this->assertEquals('username', $user->getRouteKeyName());
    }

    public function testGetId(): void
    {
        $user = new User();
        $user->setAttribute('id', 1);

        $this->assertEquals(1, $user->getId());
    }

    public function testGetName(): void
    {
        $user = new User(['name' => 'John Doe']);

        $this->assertEquals('John Doe', $user->getName());
    }

    public function testGetUserame(): void
    {
        $user = new User(['username' => 'John Doe']);

        $this->assertEquals('John Doe', $user->getUsername());
    }

    public function testGetEmail(): void
    {
        $user = new User(['email' => 'john@example.com']);

        $this->assertEquals('john@example.com', $user->getEmail());
    }
}
