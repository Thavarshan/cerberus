<?php

namespace Cerberus\Tests\Feature\Users;

use Cerberus\Tests\TestCase;
use Cerberus\Tests\Traits\CreatesUsers;
use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class UserTestCase extends TestCase
{
    use RefreshDatabase;
    use CreatesUsers;
}
