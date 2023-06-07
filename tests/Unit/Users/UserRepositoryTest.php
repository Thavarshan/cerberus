<?php

namespace Tests\Unit\Users;

use Mockery as m;
use Cerberus\Tests\TestCase;
use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use Cerberus\Contracts\Users\UserFilter;
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

    public function testGetAllUsers(): void
    {
        $users = collect([]);
        $filter = m::mock(UserFilter::class);
        $user = m::mock(User::class);
        $user->shouldReceive('filter')
            ->once()
            ->with($filter)
            ->andReturnSelf();
        $user->shouldReceive('get')
            ->once()
            ->withNoArgs()
            ->andReturn($users);

        $respository = new UserRepository($user);

        $this->assertSame($users, $respository->list($filter));
    }

    public function testFindUserByEmail(): void
    {
        $user = m::mock(User::class);
        $user->shouldReceive('whereEmail')
            ->once()
            ->with('john@example.com')
            ->andReturnSelf();

        $respository = new UserRepository($user);

        $this->assertSame($user, $respository->findByEmail('john@example.com'));
    }

    public function testFindUserByEmailReturnsNullIfNotFound(): void
    {
        $user = m::mock(User::class);
        $user->shouldReceive('whereEmail')
            ->once()
            ->with('john@example.com')
            ->andReturn(null);

        $respository = new UserRepository($user);

        $this->assertNull($respository->findByEmail('john@example.com'));
    }

    public function testCreateNewUser(): void
    {
        $dto = new UserDTO(['name' => 'John Doe']);
        $user = m::mock(User::class);
        $user->shouldReceive('create')
            ->once()
            ->with(['name' => 'John Doe'])
            ->andReturn($user);

        $respository = new UserRepository($user);

        $this->assertSame($user, $respository->create($dto));
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

        $respository = new UserRepository($user);

        $this->assertSame($user, $respository->update($user, $dto));
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

        $respository = new UserRepository($user);

        $this->assertNull($respository->delete($user));
    }
}
