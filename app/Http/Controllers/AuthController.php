<?php

namespace App\Http\Controllers;

use App\Support\Credentials;
use App\Http\Responses\AuthResponse;
use App\Http\Requests\AuthUserRequest;
use App\Http\Responses\GetUserResponse;
use Cerberus\Interfaces\Auth\AuthService;
use Illuminate\Contracts\Support\Responsable;

class AuthController extends AbstractController
{
    /**
     * The authentication service.
     *
     * @var \Cerberus\Interfaces\Auth\AuthService
     */
    protected $service;

    /**
     * Create a new AuthController instance.
     *
     * @param \Cerberus\Interfaces\Auth\AuthService $service
     *
     * @return void
     */
    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Support\Credentials $credentials
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function store(Credentials $credentials): Responsable
    {
        $user = $this->service->authenticate($credentials);

        return AuthResponse::dispatch($user);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Http\Requests\AuthUserRequest $request
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function show(AuthUserRequest $request): Responsable
    {
        return GetUserResponse::dispatch($request->user());
    }

    /**
     * Logout the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function destroy(): Responsable
    {
        $this->service->logout();

        return AuthResponse::dispatch();
    }
}
