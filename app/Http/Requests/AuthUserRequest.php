<?php

namespace App\Http\Requests;

class AuthUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->isAuthenticated();
    }
}
