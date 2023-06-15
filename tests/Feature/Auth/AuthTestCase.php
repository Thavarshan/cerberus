<?php

namespace Cerberus\Tests\Feature\Auth;

use Cerberus\Tests\TestCase;
use Cerberus\Tests\Traits\CreatesUsers;
use Cerberus\Tests\Traits\AuthenticatesUser;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTestCase extends TestCase
{
    use RefreshDatabase;
    use AuthenticatesUser;
    use CreatesUsers;
}
