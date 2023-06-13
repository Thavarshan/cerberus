<?php

namespace Cerberus\Users\Providers;

use Cerberus\Users\Models\User;
use Cerberus\Users\DTO\StoreUserDTO;
use Cerberus\Users\DTO\UpdateUserDTO;
use Illuminate\Support\Facades\Route;
use Cerberus\Users\Filters\UserFilter;
use Illuminate\Support\ServiceProvider;
use App\Http\Requests\UpdateUserRequest;
use Cerberus\Users\Services\UserService;
use Cerberus\Users\Repositories\UserRepository;
use Cerberus\Users\Http\Requests\StoreUserRequest;
use Cerberus\Interfaces\Users\User as UserInterface;
use Cerberus\Interfaces\Users\UserFilter as UserFilterInterface;
use Cerberus\Interfaces\Users\UserService as UserServiceInterface;
use Cerberus\Interfaces\Users\UserRepository as UserRepositoryInterface;

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
        $this->registerUserEntity();
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
     * Register user entity.
     *
     * @return void
     */
    public function registerUserEntity(): void
    {
        $this->app->bind(UserInterface::class, fn () => new User());
    }

    /**
     * Register user DTO.
     *
     * @return void
     */
    public function registerDTOs(): void
    {
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
