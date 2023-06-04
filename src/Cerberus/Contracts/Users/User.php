<?php

namespace Cerberus\Contracts\Users;

use Cerberus\Contracts\Entity;
use Cerberus\Auth\Tokens\Token;
use Cerberus\Contracts\Filterable;
use Illuminate\Contracts\Auth\Authenticatable;

interface User extends Authenticatable, Entity, Filterable
{
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
     * @return string
     */
    public function getToken(): string;
}
