<?php

namespace Cerberus\Auth\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Cerberus\Auth\Support\Credentials;
use Cerberus\Contracts\Auth\AuthService;

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
     * @param \Cerberus\Auth\Support\Credentials $credentials
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Credentials $credentials): JsonResponse
    {
        $user = $this->service->authenticateViaCredentials($credentials);

        return new JsonResponse($user);
    }
}
