<?php

namespace Cerberus\Auth\Providers;

// use Illuminate\Support\Facades\Gate;
use Cerberus\Users\Models\User;
use Illuminate\Support\Facades\Auth;
use Cerberus\Auth\Support\Credentials;
use Cerberus\Auth\Services\AuthService;
use Cerberus\Users\Policies\UserPolicy;
use Cerberus\Contracts\Users\UserRepository;
use Illuminate\Contracts\Auth\StatefulGuard;
use Cerberus\Auth\Http\Controllers\AuthController;
use Cerberus\Auth\Authenticators\LocalAuthenticator;
use Cerberus\Contracts\Auth\AuthService as AuthServiceInterface;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        $this->booting(function () {
            $this->registerPolicies();
        });

        $this->registerStatefulGuard();
    }

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->conditionallyRegisterAuthenticators();

        $this->extractCredentials();
    }

    /**
     * Extract credentials from the request.
     *
     * @return void
     */
    public function extractCredentials(): void
    {
        $this->app->bind(Credentials::class, function ($app) {
            $request = $app->make('request');

            $credentials = new Credentials($request->all());

            if ($token = $request->bearerToken()) {
                $credentials->setToken($token);
            }

            return $credentials;
        });
    }

    /**
     * Register default statefule authentication guard.
     *
     * @return void
     */
    public function registerStatefulGuard(): void
    {
        $this->app->bind(StatefulGuard::class, function () {
            return Auth::guard(config('auth.defaults.guard', null));
        });
    }

    /**
     * Conditionally register authenticators.
     *
     * @return void
     */
    public function conditionallyRegisterAuthenticators(): void
    {
        $this->app->when(AuthController::class)
            ->needs(AuthServiceInterface::class)
            ->give(function ($app) {
                return new AuthService(
                    repository: $app->make(UserRepository::class),
                    auth: $app->make(LocalAuthenticator::class)
                );
            });
    }
}
