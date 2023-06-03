<?php

namespace Cerberus\Tests\Unit\Users;

use Mockery as m;
use Cerberus\Users\Models\User;
use PHPUnit\Framework\TestCase;
use Cerberus\Contracts\Users\UserService;
use Cerberus\Users\Http\Requests\UserRequest;
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
        $request = m::mock(UserRequest::class);
        $request->shouldReceive('validated')
            ->once()
            ->andReturn(['name' => 'John Doe']);
        $service = m::mock(UserService::class);
        $service->shouldReceive('create')
            ->once()
            ->andReturn(new User(['name' => 'John Doe']));

        $controller = new UserController($service);
        $response = $controller->store($request);
        $data = $response->getData();

        $this->assertEquals('John Doe', $data->name);
    }
}
