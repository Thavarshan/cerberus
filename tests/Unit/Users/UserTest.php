<?php

namespace Cerberus\Tests\Unit\Users;

use Cerberus\Tests\TestCase;
use Cerberus\Auth\Tokens\Token;
use Cerberus\Users\Models\User;

/**
 * @group Users
 */
class UserTest extends TestCase
{
    public function testGetRouteKeyName(): void
    {
        $user = new User();

        $this->assertEquals(User::keyName(), $user->getRouteKeyName());
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

    public function testGetEmail(): void
    {
        $user = new User(['email' => 'john@example.com']);

        $this->assertEquals('john@example.com', $user->getEmail());
    }

    public function testSetAndGetToken(): void
    {
        $user = new User();
        $user->setToken(new MockToken('fake-token-value'));

        $this->assertEquals('fake-token-value', $user->getToken());
    }
}

class MockToken extends Token
{
}
