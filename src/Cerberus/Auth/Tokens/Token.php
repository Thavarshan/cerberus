<?php

namespace Cerberus\Auth\Tokens;

abstract class Token
{
    /**
     * The token value.
     *
     * @var string
     */
    protected $value;

    /**
     * Create new token instance.
     *
     * @param string $value
     *
     * @return void
     */
    public function __construct(string $value)
    {
        $this->value = $value;
    }

    /**
     * Get token value.
     *
     * @return string
     */
    public function getValue(): string
    {
        return $this->value;
    }
}
