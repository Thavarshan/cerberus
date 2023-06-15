<?php

namespace Cerberus\Auth\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Support\Credentials;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Cerberus\Auth\Services\AuthService;
use Cerberus\Auth\Config\Auth as AuthConfig;
use Illuminate\Contracts\Auth\StatefulGuard;
use Cerberus\Interfaces\Auth\AuthService as AuthServiceInterface;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerDefaultStatefulGuard();
        $this->registerAuthServices();
        $this->registerAuthCredentials();
    }

    /**
     * Register auth credentials (username/password) for user authentication.
     *
     * @return void
     */
    public function registerAuthCredentials(): void
    {
        $this->app->singleton(Credentials::class, function ($app) {
            return new Credentials(
                $app->make(LoginRequest::class)->validated()
            );
        });
    }

    /**
     * Register the default stateful authentication guard.
     *
     * @return void
     */
    public function registerDefaultStatefulGuard(): void
    {
        $this->app->bind(StatefulGuard::class, function () {
            return Auth::guard(AuthConfig::default('guard'));
        });
    }

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function registerAuthServices(): void
    {
        $this->app->singleton(AuthServiceInterface::class, function ($app) {
            return new AuthService($app->make(StatefulGuard::class));
        });
    }
}
