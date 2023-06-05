<?php

namespace Cerberus\Auth\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Cerberus\Contracts\Auth\AuthService;
use Cerberus\Auth\Http\Requests\LoginRequest;
use Cerberus\Auth\Http\Responses\SigninResponse;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->service->authenticateViaCredentials(
            credentials: $request->credentials()
        );

        return SigninResponse::make($user);
    }

    /**
     * Get currently authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request): JsonResponse
    {
        return new JsonResponse($request->user());
    }
}
