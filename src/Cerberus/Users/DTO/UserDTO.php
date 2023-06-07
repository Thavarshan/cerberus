<?php

namespace Cerberus\Users\DTO;

use Cerberus\Shared\Persistence\DTO\DTO;

class UserDTO extends DTO
{
    /**
     * The attributes that are specific to this DTO.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
    ];
}
