<?php

namespace Cerberus\Users\Providers;

use Illuminate\Support\ServiceProvider;
use Cerberus\Users\Services\UserService;
use Cerberus\Users\Repositories\UserRepository;
use Cerberus\Interfaces\Users\UserService as UserServiceInterface;
use Cerberus\Interfaces\Users\UserRepository as UserRepositoryInterface;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerRepositories();
        $this->registerServices();
    }

    /**
     * Register user repository.
     *
     * @return void
     */
    public function registerRepositories(): void
    {
        $this->app->singleton(UserRepositoryInterface::class, function ($app) {
            return new UserRepository($app->make(User::class));
        });
    }

    /**
     * Register user service.
     *
     * @return void
     */
    public function registerServices(): void
    {
        $this->app->singleton(UserServiceInterface::class, function ($app) {
            return new UserService(
                $app->make(UserRepositoryInterface::class)
            );
        });
    }
}
