<?php

namespace Cerberus\Contracts\Users;

use Cerberus\Users\DTO\UserDTO;

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

    /**
     * Create a new user.
     *
     * @param \Cerberus\Users\DTO\UserDTO $dto
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function create(UserDTO $dto): User;

    /**
     * Update an existing user.
     *
     * @param \Cerberus\Contracts\Users\User $user
     * @param \Cerberus\Users\DTO\UserDTO    $dto
     *
     * @return \Cerberus\Contracts\Users\User
     */
    public function update(User $user, UserDTO $dto): User;

    /**
     * Delete an existing user.
     *
     * @param \Cerberus\Contracts\Users\User $user
     *
     * @return void
     */
    public function delete(User $user): void;
}
