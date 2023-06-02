<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('Cerberus.Users.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
