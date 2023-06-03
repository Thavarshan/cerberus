<?php

namespace Tests\Unit\Users;

use Mockery as m;
use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use PHPUnit\Framework\TestCase;
use Cerberus\Users\Repositories\UserRepository;

/**
 * @group Users
 */
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

    public function testCreateNewUser(): void
    {
        $dto = new UserDTO(['name' => 'John Doe']);
        $user = m::mock(User::class);
        $user->shouldReceive('create')
            ->once()
            ->with(['name' => 'John Doe'])
            ->andReturn($user);

        $service = new UserRepository($user);

        $this->assertSame($user, $service->create($dto));
    }

    public function testUpdateUser(): void
    {
        $details = ['name' => 'John Doe'];
        $dto = new UserDTO(['name' => 'John Doe']);
        $user = m::mock(User::class);
        $user->shouldReceive('getId')
            ->once()
            ->andReturn(1);
        $user->shouldReceive('find')
            ->once()
            ->with(1)
            ->andReturnSelf();
        $user->shouldReceive('update')
            ->once()
            ->with($details)
            ->andReturn(1);
        $user->shouldReceive('fresh')
            ->once()
            ->andReturn(new User($details));

        $service = new UserRepository($user);

        $this->assertSame($user, $service->update($user, $dto));
    }

    public function testDeleteUser(): void
    {
        $user = m::mock(User::class);
        $user->shouldReceive('getId')
            ->once()
            ->andReturn(1);
        $user->shouldReceive('find')
            ->once()
            ->with(1)
            ->andReturnSelf();
        $user->shouldReceive('delete')
            ->once()
            ->andReturn(true);

        $service = new UserRepository($user);

        $this->assertNull($service->delete($user));
    }
}
