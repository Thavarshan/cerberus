<?php

namespace Cerberus\Tests\Feature\Users;

/**
 * @group Users
 */
class DeleteUserTest extends UserTestCase
{
    /**
     * A basic feature test example.
     */
    public function testExample(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
