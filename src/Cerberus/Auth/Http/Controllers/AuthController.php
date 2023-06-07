<?php

namespace Cerberus\Auth\Http\Controllers;

use Illuminate\Routing\Controller;
use Cerberus\Contracts\Auth\AuthService;
use Cerberus\Auth\Http\Requests\LoginRequest;
use Illuminate\Contracts\Support\Responsable;
use Cerberus\Auth\Http\Responses\LoginResponse;
use Cerberus\Auth\Http\Responses\LogoutResponse;
use Cerberus\Auth\Http\Responses\AuthUserResponse;

class AuthController extends Controller
{
    /**
     * The auth service instance.
     *
     * @var \Cerberus\Contracts\Auth\AuthService
     */
    protected $service;

    /**
     * Create new AuthController instance.
     *
     * @param \Cerberus\Contracts\Auth\AuthService $service
     *
     * @return void
     */
    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    /**
     * Authenticate user via credentials.
     *
     * @param \Cerberus\Auth\Http\Requests\LoginRequest $request
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function login(LoginRequest $request): Responsable
    {
        $user = $this->service->authenticateViaCredentials(
            credentials: $request->credentials()
        );

        return LoginResponse::dispatch($user);
    }

    /**
     * Get authenticated user.
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function user(): Responsable
    {
        return AuthUserResponse::dispatch();
    }

    /**
     * Logout user.
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function logout(): Responsable
    {
        $this->service->logout();

        return LogoutResponse::dispatch();
    }
}
