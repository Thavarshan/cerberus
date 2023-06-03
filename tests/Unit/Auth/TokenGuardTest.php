<?php

namespace Tests\Unit\Auth;

use Mockery as m;
use PHPUnit\Framework\TestCase;

/**
 * @group Auth
 */
class TokenGuardTest extends TestCase
{
    public function tearDown(): void
    {
        parent::tearDown();

        m::close();
    }

    /**
     * A basic unit test example.
     */
    public function testExample(): void
    {
        $this->assertTrue(true);
    }
}
