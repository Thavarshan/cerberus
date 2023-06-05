<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use Cerberus\Auth\Http\Controllers\AuthController;
use Cerberus\Users\Http\Controllers\UserController;
use Cerberus\Auth\Http\Controllers\RegisterController;

Route::get('/', static function () {
    return new JsonResponse('System OK!');
});

Route::group([
    'middleware' => 'guest',
], function (): void {
    Route::post('/login', AuthController::class . '@login')->name('login');
    Route::post('/register', RegisterController::class . '@register')->name('register');
});

Route::group([
    'middleware' => 'auth',
], function (): void {
    Route::post('/logout', AuthController::class . '@logout')->name('logout');
    // Route::post('/refresh', AuthController::class . '@refresh')->name('refresh');
    // Route::get('/user', AuthController::class . '@user')->name('user');

    Route::resource('users', UserController::class)->except(['create', 'edit']);
});
