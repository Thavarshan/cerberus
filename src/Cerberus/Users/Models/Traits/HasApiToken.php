<?php

namespace Cerberus\Users\Models\Traits;

trait HasApiToken
{
    /**
     * The user's auth token.
     *
     * @var \Cerberus\Auth\Tokens\Token
     */
    protected $token;

    /**
     * Get the access tokens that belong to model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function tokens()
    {
        return $this->morphMany(Sanctum::$personalAccessTokenModel, 'tokenable');
    }

    /**
     * Determine if the current API token has a given scope.
     *
     * @param string $ability
     *
     * @return bool
     */
    public function tokenCan(string $ability): bool
    {
        return $this->accessToken && $this->accessToken->can($ability);
    }

    /**
     * Create a new personal access token for the user.
     *
     * @param string                  $name
     * @param array                   $abilities
     * @param \DateTimeInterface|null $expiresAt
     *
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function createToken(string $name, array $abilities = ['*'], DateTimeInterface $expiresAt = null)
    {
        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken = Str::random(40)),
            'abilities' => $abilities,
            'expires_at' => $expiresAt,
        ]);

        return new NewAccessToken($token, $token->getKey() . '|' . $plainTextToken);
    }

    /**
     * Set user's auth token.
     *
     * @param \Cerberus\Auth\Tokens\Token $token
     *
     * @return void
     */
    public function setToken(Token $token): void
    {
        $this->setAttribute('token', $token->getValue());
    }

    /**
     * Get user's auth token.
     *
     * @return string
     */
    public function getToken(): string
    {
        return $this->getAttribute('token');
    }
}
