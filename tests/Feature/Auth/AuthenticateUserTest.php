<?php

namespace Tests\Feature\Auth;

use App\Support\Credentials;
use Illuminate\Http\Response;
use Cerberus\Tests\Feature\Auth\AuthTestCase;

class AuthenticateUserTest extends AuthTestCase
{
    public function testAuthenticateUserViaCredentials(): void
    {
        $user = $this->createUser();
        $username = Credentials::username();

        $response = $this->postJson('/login', [
            $username => $user->{$username},
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK);
        $this->assertAuthenticatedAs($user);
    }
}
