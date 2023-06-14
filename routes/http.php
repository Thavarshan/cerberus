<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', static function (): JsonResponse {
    return new JsonResponse('System OK!');
});

Route::group([
    'middleware' => ['auth'],
], function (): void {
    Route::resource('users', UserController::class)->except(['create', 'edit']);
});
