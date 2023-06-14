<?php

namespace Cerberus\Tests\Feature\Users;

/**
 * @group Users
 */
class CreateUserTest extends UserTestCase
{
    public function testCreateNewUserFeature(): void
    {
        $user = $this->createUser();

        $response = $this->actingAs($user)->postJson('/users', [
            'name' => 'John Doe',
            'username' => 'JohnDoe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(201);

        $data = $response->json();

        $this->assertDatabaseHas('users', [
            'name' => $data['name'],
            'email' => $data['email'],
            'username' => $data['username'],
        ]);
    }

    public function testValidNameRequired(): void
    {
        $user = $this->createUser();

        $response = $this->actingAs($user)->postJson('/users', [
            'username' => 'JohnDoe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422);

        $this->assertDatabaseMissing('users', [
            'name' => 'John Doe',
            'username' => 'JohnDoe',
            'email' => 'john@example.com',
        ]);
    }
}
