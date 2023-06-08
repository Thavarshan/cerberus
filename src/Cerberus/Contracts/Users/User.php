<?php

namespace Cerberus\Contracts\Users;

use Cerberus\Contracts\Shared\Entity;
use Cerberus\Contracts\Shared\Filterable;
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
     * Reload the current model instance with fresh attributes from the database.
     *
     * @return $this
     */
    public function refresh();
}
