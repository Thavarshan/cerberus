<?php

// phpcs:ignoreFile

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegisterController;

Route::get('/', static function (): JsonResponse {
    return new JsonResponse('System OK!');
});

Route::group([
    'middleware' => ['guest'],
], function (): void {
    Route::post('/login', AuthController::class . '@store')->name('login');
    Route::post('/register', RegisterController::class)->name('register');
});

Route::group([
    'middleware' => ['auth'],
], function (): void {
    Route::post('/logout', AuthController::class . '@destroy')->name('logout');

    Route::resource('users', UserController::class)->except(['create', 'edit']);
});
