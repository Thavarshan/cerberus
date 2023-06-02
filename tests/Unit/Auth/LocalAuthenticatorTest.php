<?php

namespace Tests\Unit\Auth;

use Mockery as m;
use Cerberus\Users\Models\User;
use PHPUnit\Framework\TestCase;
use Cerberus\Auth\Support\Credentials;
use Illuminate\Contracts\Auth\StatefulGuard;
use Cerberus\Auth\Authenticators\LocalAuthenticator;

class LocalAuthenticatorTest extends TestCase
{
    public function tearDown(): void
    {
        m::close();
    }

    public function testAuthenticateUser(): void
    {
        $password = '$2y$10$UnR7.VrkVusS5Yc08luJUu0BDLB4gITtKAuT083ZrCbq3j2UMqgGu'; // password
        $details = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => $password,
        ];

        $user = m::mock(User::class);
        $user->shouldReceive('getAttribute')->with('id')->andReturn(1);
        $user->shouldReceive('getAttribute')->with('name')->andReturn('John Doe');
        $user->shouldReceive('getAttribute')->with('email')->andReturn('john@example.com');
        $user->shouldReceive('getAttribute')->with('password')->andReturn($password);

        $credentials = m::mock(Credentials::class);
        $credentials->shouldReceive('local')->andReturn($details);

        $guard = m::mock(StatefulGuard::class);
        $guard->shouldReceive('attempt')
            ->once()
            ->with($credentials->local(), false)
            ->andReturn(true);
        $guard->shouldReceive('user')->andReturn($user);

        $auth = new LocalAuthenticator($guard);
        $authUser = $auth->authenticate($credentials);

        $this->assertTrue(true);
        $this->assertInstanceOf(User::class, $authUser);
        $this->assertEquals($user->id, $authUser->id);
        $this->assertEquals($user->name, $authUser->name);
        $this->assertEquals($user->email, $authUser->email);
    }
}
