<?php

namespace Cerberus\Auth\Http\Requests;

use Cerberus\Auth\Support\Credentials;
use Cerberus\Shared\Http\Requests\Request;

class LoginRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return is_null($this->user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $username = config('auth.credentials.username');

        $overrides = 'email' === $username
            ? ['email', 'exists:users,email']
            : ['string'];

        return [
            $username => array_merge(['required'], $overrides),
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Get the credentials from the request.
     *
     * @return \Cerberus\Auth\Support\Credentials
     */
    public function credentials(): Credentials
    {
        return new Credentials($this->validated());
    }
}
