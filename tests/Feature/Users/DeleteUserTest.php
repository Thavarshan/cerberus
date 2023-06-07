<?php

namespace Cerberus\Tests\Feature\Users;

/**
 * @group Users
 */
class DeleteUserTest extends UserTestCase
{
    public function testDeleteUser(): void
    {
        $user = $this->createUser();

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
        ]);

        $response = $this->actingAs($user)
            ->deleteJson("/users/{$user->username}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('users', [
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
        ]);
    }
}
