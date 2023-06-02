<?php

namespace Tests\Unit\Auth;

use PHPUnit\Framework\TestCase;
use Cerberus\Auth\Support\Credentials;

class CredentialsTest extends TestCase
{
    public function testGetSpecificDetail(): void
    {
        $credentials = new Credentials([
            'email' => 'john@example.com',
            'password' => 'Password123!',
        ]);

        $this->assertEquals('john@example.com', $credentials->get('email'));
        $this->assertEquals('Password123!', $credentials->get('password'));
    }

    public function testGetNonExistantDetailWithDefault(): void
    {
        $credentials = new Credentials([
            'email' => 'john@example.com',
        ]);

        $this->assertEquals(
            'Password123!',
            $credentials->get('password', 'Password123!')
        );
    }

    public function testGetNonExistantDetailWithoutDefault(): void
    {
        $credentials = new Credentials([
            'email' => 'john@example.com',
        ]);

        $this->assertNull($credentials->get('password'));
    }
}
