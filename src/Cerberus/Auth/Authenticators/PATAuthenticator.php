<?php

namespace Cerberus\Auth\Authenticators;

use Cerberus\Users\Models\User;
use Cerberus\Auth\Models\PAToken;
use Illuminate\Contracts\Auth\Guard;
use Cerberus\Auth\Support\Credentials;
use Cerberus\Contracts\Auth\Authenticator;
use Illuminate\Contracts\Auth\UserProvider;
use Cerberus\Auth\Events\TokenAuthenticated;
use Cerberus\Auth\Exceptions\TokenExpiredException;
use Cerberus\Contracts\Users\User as UserInterface;
use Cerberus\Auth\Exceptions\TokenNotFoundException;
use Cerberus\Auth\Exceptions\InvalidCredentialsException;
use Cerberus\Auth\Authenticators\Authenticator as AbstractAuthenticator;

class PATAuthenticator extends AbstractAuthenticator implements Authenticator
{
    /**
     * The number of minutes tokens should be allowed to remain valid.
     *
     * @var int
     */
    protected $expiration;

    /**
     * Create a new guard instance.
     *
     * @param \Illuminate\Contracts\Auth\Guard $guard
     * @param int                              $expiration
     *
     * @return void
     */
    public function __construct(Guard $guard, int $expiration = null)
    {
        parent::__construct($guard);

        $this->expiration = $expiration;
    }

    /**
     * Authenticate a user using the given credentials.
     *
     * @param \Cerberus\Auth\Support\Credentials $credentials
     *
     * @return \Cerberus\Contracts\Users\User
     *
     * @throws \Cerberus\Auth\Exceptions\TokenNotFoundException
     * @throws \Cerberus\Auth\Exceptions\TokenExpiredException
     */
    public function authenticate(Credentials $credentials): UserInterface
    {
        $token = $this->findByToken($credentials->getToken());

        $this->validateToken($token);

        event(new TokenAuthenticated($token));

        $user = with($this->guard->getProvider(), function (
            UserProvider $provider
        ) use ($token) {
            return $provider->retrieveById($token->getUserId());
        });

        if (is_null($user)) {
            throw new \Exception('User not found');
        }

        $this->guard->setUser($user);

        $token->setLastUsed(now());

        return $user;
    }

    /**
     * Find a token by the given token ID.
     *
     * @param string $token
     *
     * @return \Cerberus\Auth\Models\PAToken|null
     */
    protected function findByToken(string $token): ?PAToken
    {
        return $this->getTokenModel()->where('value', $token)->first();
    }

    /**
     * Determine if the provided access token is valid.
     *
     * @param \Cerberus\Auth\Models\PAToken $accessToken
     *
     * @return void
     *
     * @throws \Cerberus\Auth\Exceptions\TokenNotFoundException
     * @throws \Cerberus\Auth\Exceptions\TokenExpiredException
     */
    protected function validateToken(?PAToken $token): void
    {
        if (! $token) {
            throw new TokenNotFoundException();
        }

        if (! $this->isValidBearerToken($token)) {
            throw new InvalidCredentialsException('Invalid token.');
        }

        $isValid = (
            ! $this->expiration
            || $token->created_at->gt(now()->subMinutes($this->expiration))
        ) && (
            ! $token->expires_at
            || ! $token->expires_at->isPast()
        );

        if (! $isValid) {
            throw new TokenExpiredException();
        }
    }

    /**
     * Determine if the bearer token is in the correct format.
     *
     * @param string|null $token
     *
     * @return bool
     */
    protected function isValidBearerToken(string $token = null): bool
    {
        if (! is_null($token) && str_contains($token, '|')) {
            if ('int' === $this->getTokenModel()->getKeyType()) {
                [$id, $token] = explode('|', $token, 2);

                return ctype_digit($id) && ! empty($token);
            }
        }

        return ! empty($token);
    }

    /**
     * Get the token model.
     *
     * @return \Cerberus\Auth\Models\PAToken
     */
    protected function getTokenModel(): PAToken
    {
        return new PAToken();
    }
}
