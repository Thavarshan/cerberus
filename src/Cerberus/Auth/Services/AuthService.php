<?php

namespace Cerberus\Auth\Services;

use Cerberus\Auth\Support\Credentials;
use Cerberus\Auth\Tokens\TransientToken;
use Cerberus\Contracts\Auth\Authenticator;
use Cerberus\Contracts\Users\User as UserInterface;
use Cerberus\Shared\Persistence\Services\AbstractService;
use Cerberus\Contracts\Auth\AuthService as AuthServiceInterface;
use Cerberus\Contracts\Users\UserRepository as UserRepositoryInterface;

class AuthService extends AbstractService implements AuthServiceInterface
{
    /**
     * Authenticator instance.
     *
     * @var \Cerberus\Contracts\Auth\Authenticator
     */
    protected $auth;

    /**
     * Create new AuthService instance.
     *
     * @param \Cerberus\Contracts\Users\UserRepository $repository
     * @param \Cerberus\Contracts\Auth\Authenticator   $auth
     *
     * @return void
     */
    public function __construct(
        UserRepositoryInterface $repository,
        Authenticator $auth
    ) {
        $this->repository = $repository;
        $this->auth = $auth;
    }

    /**
     * Authenticate user via username/email and password.
     *
     * @param \Cerberus\Auth\Support\Credentials $credentials
     *
     * @return \Cerberus\Contracts\Auth\User
     */
    public function authenticateViaCredentials(
        Credentials $credentials
    ): UserInterface {
        $user = $this->auth->authenticate($credentials);

        $user->setToken(new TransientToken());

        return $user;
    }

    // public function authenticateViaToken(
    //     Credentials $credentials
    // ): UserInterface {
    //     // code...
    // }

    // public function authenticateViaSocial(
    //     Credentials $credentials
    // ): UserInterface {
    //     // code...
    // }

    // public function authenticateViaJWT(
    //     Credentials $credentials
    // ): UserInterface {
    //     // code...
    // }

    /**
     * Logout user.
     *
     * @return void
     */
    public function logout(): void
    {
        $this->auth->logout();
    }
}
