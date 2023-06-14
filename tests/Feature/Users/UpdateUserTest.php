<?php

namespace Cerberus\Tests\Feature\Users;

/**
 * @group Users
 */
class UpdateUserTest extends UserTestCase
{
    public function testUpdateUserFeature(): void
    {
        $user = $this->createUser();

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
        ]);

        $response = $this->actingAs($user)
            ->putJson("/users/{$user->username}", [
                'name' => 'James Doe',
                'username' => 'JamesDoe',
                'email' => 'james@example.com',
            ]);

        $response->assertStatus(200);

        $data = $response->json();

        $this->assertDatabaseHas('users', [
            'name' => $data['name'],
            'username' => $data['username'],
            'email' => $data['email'],
        ]);

        $this->assertNotEquals($user->name, $data['name']);
        $this->assertNotEquals($user->username, $data['username']);
        $this->assertNotEquals($user->email, $data['email']);
    }
}
