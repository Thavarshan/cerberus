<?php

namespace Cerberus\Tests\Unit\Users;

use Mockery as m;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use Cerberus\Users\Filters\UserFilter;
use Illuminate\Database\Eloquent\Builder;

class UserFilterTest extends TestCase
{
    public function tearDown(): void
    {
        parent::tearDown();

        m::close();
    }

    public function testFilterUserByEmail(): void
    {
        $request = m::mock(Request::class);
        $request->shouldReceive('only')
            ->once()
            ->andReturn(['email' => 'john@example.com']);
        $builder = m::mock(Builder::class);
        $builder->shouldReceive('where')
            ->once()
            ->with('email', 'john@example.com')
            ->andReturnSelf();

        $filter = new UserFilter($request);

        try {
            $filter->apply($builder);
        } catch (\Throwable $e) {
            $this->fail($e->getMessage());

            return;
        }

        $this->assertTrue(true);
    }

    public function testFilterUserByUsername(): void
    {
        $request = m::mock(Request::class);
        $request->shouldReceive('only')
            ->once()
            ->andReturn(['username' => 'johnDoe']);
        $builder = m::mock(Builder::class);
        $builder->shouldReceive('where')
            ->once()
            ->with('username', 'johnDoe')
            ->andReturnSelf();

        $filter = new UserFilter($request);

        try {
            $filter->apply($builder);
        } catch (\Throwable $e) {
            $this->fail($e->getMessage());

            return;
        }

        $this->assertTrue(true);
    }
}
