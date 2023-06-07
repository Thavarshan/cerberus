<?php

namespace Cerberus\Users\Providers;

use Cerberus\Users\DTO\UserDTO;
use Cerberus\Users\Models\User;
use Cerberus\Users\DTO\StoreUserDTO;
use Cerberus\Users\DTO\UpdateUserDTO;
use Illuminate\Support\Facades\Route;
use Cerberus\Users\Filters\UserFilter;
use Illuminate\Support\ServiceProvider;
use Cerberus\Users\Services\UserService;
use Cerberus\Users\Http\Requests\UserRequest;
use Cerberus\Users\Repositories\UserRepository;
use Cerberus\Users\Http\Requests\StoreUserRequest;
use Cerberus\Users\Http\Requests\UpdateUserRequest;
use Cerberus\Contracts\Users\UserFilter as UserFilterInterface;
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
        $this->registerUserRouteModelBinding();

        $this->registerFilters();
        $this->registerRepositories();
        $this->registerServices();

        $this->registerDTOs();
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

    /**
     * Register user filters.
     *
     * @return void
     */
    public function registerFilters(): void
    {
        $this->app->singleton(UserFilterInterface::class, function ($app) {
            return new UserFilter($app->make('request'));
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
    public function registerDTOs(): void
    {
        $this->app->singleton(UserDTO::class, function ($app) {
            $request = $app->make(UserRequest::class);

            return new UserDTO($request->validated());
        });

        $this->app->singleton(StoreUserDTO::class, function ($app) {
            $request = $app->make(StoreUserRequest::class);

            return new StoreUserDTO($request->validated());
        });

        $this->app->singleton(UpdateUserDTO::class, function ($app) {
            $request = $app->make(UpdateUserRequest::class);

            return new UpdateUserDTO($request->validated());
        });
    }
}
