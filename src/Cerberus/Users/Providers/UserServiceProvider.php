<?php

namespace Cerberus\Users\Providers;

use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Cerberus\Users\Services\UserService;
use Cerberus\Users\Repositories\UserRepository;
use Cerberus\Contracts\Users\UserService as UserServiceInterface;
use Cerberus\Contracts\Users\UserRepository as UserRepositoryInterface;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerRepository();
        $this->registerService();

        $this->registerUserRouteModelBinding();

        $this->registerDTO();
    }

    /**
     * Register user repository.
     *
     * @return void
     */
    public function registerRepository(): void
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
    public function registerService(): void
    {
        $this->app->singleton(UserServiceInterface::class, function ($app) {
            return new UserService(
                $app->make(UserRepositoryInterface::class)
            );
        });
    }

    /**
     * Register user route model binding.
     *
     * @return void
     */
    public function registerUserRouteModelBinding(): void
    {
        Route::bind('user', function (string $value) {
            $service = $this->app->make(UserServiceInterface::class);

            return $service->findBy(User::keyName(), $value);
        });
    }

    /**
     * Register user DTO.
     *
     * @return void
     */
    public function registerDTO(): void
    {
        $this->app->singleton(UserDTO::class, function ($app) {
            $request = $app->make(UserRequest::class);

            return new UserDTO($request->validated());
        });
    }
}
