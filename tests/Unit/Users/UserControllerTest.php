<?php

namespace Cerberus\Tests\Unit\Users;

use Mockery as m;
use Cerberus\Tests\TestCase;
use Cerberus\Users\Models\User;
use Cerberus\Users\DTO\StoreUserDTO;
use Cerberus\Users\DTO\UpdateUserDTO;
use Cerberus\Users\Filters\UserFilter;
use App\Http\Controllers\UserController;
use Cerberus\Interfaces\Users\UserService;

/**
 * @group Users
 */
class UserControllerTest extends TestCase
{
    public function tearDown(): void
    {
        m::close();
    }

    public function testGetAllUsers(): void
    {
        $users = [
            new User(['name' => 'John Doe']),
            new User(['name' => 'Jane Doe']),
        ];
        $filter = m::mock(UserFilter::class);
        $service = m::mock(UserService::class);
        $service->shouldReceive('list')
            ->once()
            ->with($filter)
            ->andReturn(collect($users));

        $controller = new UserController($service);
        $response = $controller->index($filter);
        $data = $response->getContent();

        $this->assertCount(2, $data);
        $this->assertEquals('John Doe', $data[0]->name);
        $this->assertEquals('Jane Doe', $data[1]->name);
    }

    public function testGetSpecificUser(): void
    {
        $user = new User(['name' => 'John Doe']);
        $service = m::mock(UserService::class);

        $controller = new UserController($service);
        $response = $controller->show($user);
        $data = $response->getContent();

        $this->assertEquals($user->name, $data->name);
    }

    public function testCreateNewUser(): void
    {
        $details = ['name' => 'John Doe'];
        $dto = m::mock(StoreUserDTO::class);
        $service = m::mock(UserService::class);
        $service->shouldReceive('create')
            ->once()
            ->with($dto)
            ->andReturn(new User($details));

        $controller = new UserController($service);
        $response = $controller->store($dto);
        $data = $response->getContent();

        $this->assertEquals('John Doe', $data->name);
    }

    public function testUpdateExistingUser(): void
    {
        $user = new User(['name' => 'John Doe']);
        $details = ['name' => 'James Doe'];
        $dto = m::mock(UpdateUserDTO::class);
        $service = m::mock(UserService::class);
        $service->shouldReceive('update')
            ->once()
            ->with($user, $dto)
            ->andReturn(new User($details));

        $controller = new UserController($service);
        $response = $controller->update($user, $dto);
        $data = $response->getContent();

        $this->assertEquals('James Doe', $data->name);
    }

    public function testDeleteUser(): void
    {
        $user = new User(['name' => 'John Doe']);
        $service = m::mock(UserService::class);
        $service->shouldReceive('delete')
            ->once()
            ->with($user)
            ->andReturnNull();

        $controller = new UserController($service);
        $response = $controller->destroy($user);
        $data = $response->getContent();

        $this->assertEmpty((array) $data);
    }
}
