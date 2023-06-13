<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

final class UpdateUserRequest extends GetUserRequest
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
                Rule::unique('users')->ignore(
                    $this->getUserEntity()->getId()
                ),
            ],
        ];
    }
}
