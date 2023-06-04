<?php

namespace Cerberus\Tests\Feature\Users;

/**
 * @group Users
 */
class GetUserTest extends UserTestCase
{
    public function testGetSpecificUser(): void
    {
        $user = $this->createUser();

        $this->actingAs($user)
            ->get("/users/{$user->username}")
            ->assertStatus(200)
            ->assertJson([
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
            ]);
    }

    public function testGetNonExistingUser(): void
    {
        $user = $this->createUser();

        $this->actingAs($user)
            ->get('/users/fake-username')
            ->assertStatus(404);
    }
}
