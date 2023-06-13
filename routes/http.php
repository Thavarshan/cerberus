<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::group([
    'middleware' => ['auth'],
], function (): void {
    Route::resource('users', UserController::class)->except(['create', 'edit']);
});
