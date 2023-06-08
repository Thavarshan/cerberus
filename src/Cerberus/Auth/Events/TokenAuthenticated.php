<?php

namespace Cerberus\Auth\Events;

use Cerberus\Auth\Models\PAToken;

class TokenAuthenticated extends TokenEvent
{
    /**
     * The personal access token that was authenticated.
     *
     * @var \Cerberus\Auth\Models\PAToken
     */
    public $token;

    /**
     * Create a new event instance.
     *
     * @param \Cerberus\Auth\Models\PAToken $token
     *
     * @return void
     */
    public function __construct(PAToken $token)
    {
        $this->token = $token;
    }
}
