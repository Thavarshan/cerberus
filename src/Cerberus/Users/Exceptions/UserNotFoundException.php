<?php

namespace Cerberus\Users\Exceptions;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class UserNotFoundException extends \Exception
{
    /**
     * Create a new exception instance.
     *
     * @param string $email
     *
     * @return static
     */
    public static function withEmail(string $email): static
    {
        return new static("A user with the email address `{$email}` could not be found.");
    }

    /**
     * Create a new exception instance.
     *
     * @param string $username
     *
     * @return static
     */
    public static function withUsername(string $username): static
    {
        return new static("A user with the username `{$username}` could not be found.");
    }

    /**
     * Create a new exception instance.
     *
     * @param int|string $id
     *
     * @return static
     */
    public static function withId(int|string $id): static
    {
        return new static("A user with the ID `{$id}` could not be found.");
    }

    /**
     * Create a new exception instance.
     *
     * @param string $key
     * @param string $value
     *
     * @return static
     */
    public static function withKey(string $key, string $value): static
    {
        return new static("A user with the {$key} `{$value}` could not be found.");
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function render(Request $request): Response
    {
        return response($this->getMessage(), Response::HTTP_NOT_FOUND);
    }
}
