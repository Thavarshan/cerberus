<?php

namespace Cerberus\Users\Http\Controllers;

use Cerberus\Users\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class UserController extends Controller
{
    /**
     * Get currently authenticated user.
     *
     * @param \Cerberus\Users\Models\User $user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        return new JsonResponse($user);
    }
}
