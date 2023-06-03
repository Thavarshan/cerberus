<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use Cerberus\Auth\Http\Controllers\AuthController;

Route::get('/', static function () {
    return new JsonResponse('System OK!');
});

Route::group([
    'middleware' => 'guest',
], function (): void {
    Route::post('/login', AuthController::class . '@login')->name('login');
    // Route::post('/register', RegisterController::class . '@register')->name('register');
});
