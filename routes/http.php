<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use Cerberus\Auth\Http\Controllers\AuthController;

Route::get('/', static function () {
    return new JsonResponse('System OK!');
});

Route::group([
    'middleware' => 'guest',
], function () {
    Route::post('/signin', AuthController::class . '@store')->name('signin');
});
