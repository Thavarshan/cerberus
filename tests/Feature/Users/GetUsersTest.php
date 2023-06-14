<?php

namespace Cerberus\Tests\Feature\Users;

/**
 * @group Users
 */
class GetUsersTest extends UserTestCase
{
    public function testAllUsers(): void
    {
        $user = $this->createUser();

        $this->createUser(5);

        $response = $this->actingAs($user)->getJson('/users');
        $response->assertStatus(200);
        $data = $response->json();

        $this->assertCount(6, $data);
    }

    public function testFilterUsers(): void
    {
        $user = $this->createUser(null, [
            'username' => 'John',
        ]);

        $this->createUser(19);

        $response = $this->actingAs($user)->getJson('/users?username=John');
        $response->assertStatus(200);
        $data = $response->json();

        $this->assertCount(1, $data);
    }
}
