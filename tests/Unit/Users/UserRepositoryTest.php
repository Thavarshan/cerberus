<?php

namespace Tests\Unit\Users;

use Mockery as m;
use Cerberus\Users\Models\User;
use PHPUnit\Framework\TestCase;
use Cerberus\Users\Repositories\UserRepository;

class UserRepositoryTest extends TestCase
{
    public function tearDown(): void
    {
        parent::tearDown();

        m::close();
    }

    public function testFindUserByEmail(): void
    {
        $user = m::mock(User::class);
        $user->shouldReceive('whereEmail')
            ->once()
            ->with('john@example.com')
            ->andReturnSelf();

        $service = new UserRepository($user);

        $this->assertSame($user, $service->findByEmail('john@example.com'));
    }

    public function testFindUserByEmailReturnsNullIfNotFound(): void
    {
        $user = m::mock(User::class);
        $user->shouldReceive('whereEmail')
            ->once()
            ->with('john@example.com')
            ->andReturn(null);

        $service = new UserRepository($user);

        $this->assertNull($service->findByEmail('john@example.com'));
    }
}
