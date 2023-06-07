<?php

namespace Cerberus\Users\DTO;

class UpdateUserDTO extends UserDTO
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
    ];
}
