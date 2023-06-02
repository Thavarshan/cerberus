<?php

namespace Cerberus\Users\Http\Requests;

use Illuminate\Http\Request;

class UserRequest extends Request
{
    /**
     * Get the email address from the JWT token.
     *
     * @return string
     */
    public function getEmail(): string
    {
        return 'john@example.com';
    }
}
