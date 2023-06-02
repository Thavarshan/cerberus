<?php

namespace Tests\Feature\Auth;

use Cerberus\Tests\TestCase;
use Cerberus\Users\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * The user instance.
     *
     * @var \Cerberus\Users\Models\User
     */
    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::create([
            'name' => 'John Doe',
            'username' => 'johndoe',
            'email' => 'user@example.com',
            'password' => Hash::make('Password123!'),
        ]);
    }

    public function testAuthenticateViaCredentials(): void
    {
        $response = $this->post('/signin', [
            'email' => 'user@example.com',
            'password' => 'Password123!',
        ], [
            'Authorization' => 'Bearer fake-api-token', // Testing for credential filtering
        ]);

        $response->assertSuccessful();
        $user = $response->getData();

        $this->assertEquals($this->user->id, $user->id);
        $this->assertEquals($this->user->name, $user->name);
        $this->assertEquals($this->user->email, $user->email);

        $this->assertAuthenticated();
    }
}
