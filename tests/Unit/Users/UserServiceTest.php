<?php

namespace Tests\Unit\Users;

use Mockery as m;
use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use PHPUnit\Framework\TestCase;
use Cerberus\Contracts\Users\UserFilter;
use Cerberus\Users\Services\UserService;
use Cerberus\Contracts\Users\UserRepository;
use Cerberus\Users\Exceptions\UserNotFoundException;

/**
 * @group Users
 */
class UserServiceTest extends TestCase
{
    public function tearDown(): void
    {
        parent::tearDown();

        m::close();
    }

    public function testGetAllUsers(): void
    {
        $users = collect([]);
        $filter = m::mock(UserFilter::class);
        $repository = m::mock(UserRepository::class);
        $repository->shouldReceive('list')
            ->once()
            ->with($filter)
            ->andReturn($users);

        $service = new UserService($repository);

        $this->assertSame($users, $service->list($filter));
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

    public function testCreateNewUser(): void
    {
        $dto = new UserDTO(['name' => 'John Doe']);
        $user = m::mock(User::class);
        $repository = m::mock(UserRepository::class);
        $repository->shouldReceive('create')
            ->once()
            ->with($dto)
            ->andReturn($user);

        $service = new UserService($repository);

        $this->assertSame($user, $service->create($dto));
    }

    public function testUpdateUser(): void
    {
        $dto = new UserDTO(['name' => 'John Doe']);
        $user = m::mock(User::class);
        $repository = m::mock(UserRepository::class);
        $repository->shouldReceive('update')
            ->once()
            ->with($user, $dto)
            ->andReturn($user);

        $service = new UserService($repository);

        $this->assertSame($user, $service->update($user, $dto));
    }

    public function testDeleteUser(): void
    {
        $user = m::mock(User::class);
        $repository = m::mock(UserRepository::class);
        $repository->shouldReceive('delete')
            ->once()
            ->with($user)
            ->andReturnNull();

        $service = new UserService($repository);

        $this->assertNull($service->delete($user));
    }
}
