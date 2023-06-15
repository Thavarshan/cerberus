<?php

namespace Tests\Unit\Auth;

use Mockery as m;
use App\Support\Credentials;
use Cerberus\Tests\TestCase;
use Cerberus\Auth\Services\AuthService;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Contracts\Auth\Authenticatable;

class AuthServiceTest extends TestCase
{
    protected function tearDown(): void
    {
        m::close();
    }

    public function testAuthenticateUserViaCredentials(): void
    {
        $user = m::mock(Authenticatable::class);
        $credentials = new Credentials([
            'email' => 'john@example.com',
            'password' => 'password',
        ]);
        $guard = m::mock(StatefulGuard::class);
        $guard->shouldReceive('attempt')
            ->with(['email' => 'john@example.com', 'password' => 'password'])
            ->once()
            ->andReturn(true);
        $guard->shouldReceive('user')
            ->once()
            ->andReturn($user);

        $service = new AuthService($guard);
        $authUser = $service->authenticate($credentials);

        $this->assertSame($user, $authUser);
    }
}
