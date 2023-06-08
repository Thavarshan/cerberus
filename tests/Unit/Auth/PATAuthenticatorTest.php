<?php

namespace Tests\Unit\Auth;

use Mockery as m;
use Cerberus\Tests\TestCase;
use Cerberus\Users\Models\User;
use Cerberus\Auth\Models\PAToken;
use Illuminate\Contracts\Auth\Guard;
use Cerberus\Auth\Support\Credentials;
use Illuminate\Contracts\Auth\UserProvider;
use Cerberus\Auth\Authenticators\PATAuthenticator;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * @group Auth
 */
class PATAuthenticatorTest extends TestCase
{
    use RefreshDatabase;

    public function tearDown(): void
    {
        parent::tearDown();

        m::close();
    }

    public function testAuthenticationIsAttemptedWithToken()
    {
        [$user, $token] = $this->createUserWithToken();

        $provider = m::mock(UserProvider::class);
        $provider->shouldReceive('retrieveById')->andReturn($user);
        $guard = m::mock(Guard::class);
        $guard->shouldReceive('getProvider')->andReturn($provider);
        $guard->shouldReceive('setUser')->with($user);
        $auth = new PATAuthenticator($guard, null);

        $authUser = $auth->authenticate(
            new Credentials(['token' => $token->value])
        );

        $this->assertSame($user, $authUser);
    }

    /**
     * Create a user with a token for testing.
     *
     * @return array
     */
    protected function createUserWithToken(): array
    {
        $user = User::create([
            'name' => 'Test User',
            'username' => 'testUser',
            'email' => 'test@examepl.com',
            'password' => 'password',
        ]);

        $token = PAToken::create([
            'name' => 'Test Token',
            'user_id' => 1,
            'value' => 'test-token',
            'last_used' => now(),
        ]);

        return [$user, $token];
    }
}
