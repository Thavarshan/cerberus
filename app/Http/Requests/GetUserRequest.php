<?php

namespace App\Http\Requests;

use Cerberus\Interfaces\Users\User;

class GetUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return ! is_null($this->user());
    }

    /**
     * Get the user from the route params or else the user making the request.
     *
     * @return \Cerberus\Interfaces\Users\User|null
     */
    public function getUserEntity(): ?User
    {
        return $this->route('user') ?: $this->user();
    }
}
