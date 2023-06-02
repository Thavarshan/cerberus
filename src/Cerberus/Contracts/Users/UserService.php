<?php

namespace Cerberus\Contracts\Users;

interface UserService
{
    /**
     * Find a user by their email address.
     *
     * @param string $email
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function findByEmail(string $email): User;

    /**
     * Find a user by their ID.
     *
     * @param int|string $id
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function find(int|string $id): User;

    /**
     * Find a user by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function findBy(string $key, string $value): User;
}
