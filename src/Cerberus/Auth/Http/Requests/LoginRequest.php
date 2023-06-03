<?php

namespace Cerberus\Auth\Http\Requests;

use Cerberus\Auth\Support\Credentials;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
                'required',
                'email',
                'exists:users,email',
            ],

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
