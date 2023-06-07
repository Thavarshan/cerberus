<?php

namespace Cerberus\Users\Http\Requests;

use Cerberus\Users\Models\User;
use Illuminate\Validation\Rule;
use Cerberus\Auth\Rules\PasswordRule;

final class StoreUserRequest extends UserRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => [
                'required',
                'string',
                new PasswordRule(),
                'confirmed',
            ],
        ];
    }
}
