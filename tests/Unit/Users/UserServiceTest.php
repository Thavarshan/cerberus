<?php

namespace Tests\Unit\Users;

use Mockery as m;
use PHPUnit\Framework\TestCase;
use Cerberus\Contracts\Users\User;
use Cerberus\Users\Services\UserService;
use Cerberus\Contracts\Users\UserRepository;
use Cerberus\Users\Exceptions\UserNotFoundException;

class UserServiceTest extends TestCase
{
    public function tearDown(): void
    {
        m::close();
    }

    public function testFindUserByEmail(): void
    {
        $user = m::mock(User::class);
        $repository = m::mock(UserRepository::class);
        $repository->shouldReceive('findByEmail')
            ->once()
            ->with('john@example.com')
            ->andReturn($user);

        $service = new UserService($repository);

        $this->assertSame($user, $service->findByEmail('john@example.com'));
    }

    public function testFindUserByEmailThrowsExceptionIfUserNotFound(): void
    {
        $this->expectException(UserNotFoundException::class);

        $repository = m::mock(UserRepository::class);
        $repository->shouldReceive('findByEmail')
            ->once()
            ->with('john@example.com')
            ->andReturn(null);

        $service = new UserService($repository);

        $service->findByEmail('john@example.com');
    }
}
