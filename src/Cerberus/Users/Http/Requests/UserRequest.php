<?php

namespace Cerberus\Users\Http\Requests;

use Cerberus\Contracts\Users\User;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the user from the route params or else the user making the request.
     *
     * @return \Cerberus\Contracts\Users\User|null
     */
    public function getUserEntity(): ?User
    {
        return $this->route('user') ?: $this->user();
    }
}
