<?php

namespace Cerberus\Tests\Fixtures;

use Cerberus\Contracts\Users\User as UserInterface;

class User implements UserInterface
{
    protected $attributes;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    /**
     * Get user's ID.
     *
     * @return int
     */
    public function getId(): int;

    /**
     * Get user's name.
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Get user's email.
     *
     * @return string
     */
    public function getEmail(): string;

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Contracts\Users\User|null
     */
    public function whereEmail($email): ?User;

    /**
     * Set user's auth token.
     *
     * @param \Cerberus\Auth\Tokens\Token $token
     *
     * @return void
     */
    public function setToken(Token $token): void;

    /**
     * Get user's auth token.
     *
     * @return \Cerberus\Auth\Tokens\Token
     */
    public function getToken(): Token;
}
