<?php

namespace App\Http\Requests;

use App\Support\Credentials;
use Cerberus\Auth\Config\Auth;

class LoginRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->isGuest();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $username = Credentials::username();

        return [
            $username => array_merge(
                ['required', 'string'],
                'email' === $username ? ['email'] : []
            ),

            'password' => ['required', 'string'],
        ];
    }

    /**
     * Get the name of the username attribute from the request.
     *
     * @return string
     */
    public function username(): string
    {
        return Auth::credentials('username');
    }
}
