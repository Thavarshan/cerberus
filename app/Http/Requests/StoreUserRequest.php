<?php

namespace App\Http\Requests;

use App\Rules\PasswordRule;
use Cerberus\Users\Models\User;
use Illuminate\Validation\Rule;

final class StoreUserRequest extends GetUserRequest
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
