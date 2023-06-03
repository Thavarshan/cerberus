<?php

namespace Cerberus\Tests\Unit\Users;

use Mockery as m;
use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use PHPUnit\Framework\TestCase;
use Cerberus\Contracts\Users\UserService;
use Cerberus\Users\Http\Controllers\UserController;

class UserControllerTest extends TestCase
{
    public function tearDown(): void
    {
        m::close();
    }

    public function testGetSpecificUser(): void
    {
        $user = new User(['name' => 'John Doe']);
        $service = m::mock(UserService::class);

        $controller = new UserController($service);
        $response = $controller->show($user);
        $data = $response->getData();

        $this->assertEquals($user->name, $data->name);
    }

    public function testCreateNewUser(): void
    {
        $details = ['name' => 'John Doe'];
        $dto = m::mock(UserDTO::class);
        $service = m::mock(UserService::class);
        $service->shouldReceive('create')
            ->once()
            ->with($dto)
            ->andReturn(new User($details));

        $controller = new UserController($service);
        $response = $controller->store($dto);
        $data = $response->getData();

        $this->assertEquals('John Doe', $data->name);
    }

    public function testUpdateExistingUser(): void
    {
        $user = new User(['name' => 'John Doe']);
        $details = ['name' => 'James Doe'];
        $dto = m::mock(UserDTO::class);
        $service = m::mock(UserService::class);
        $service->shouldReceive('update')
            ->once()
            ->with($user, $dto)
            ->andReturn(new User($details));

        $controller = new UserController($service);
        $response = $controller->update($user, $dto);
        $data = $response->getData();

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
        $response = $controller->delete($user);
        $data = $response->getData();

        $this->assertEmpty((array) $data);
    }
}