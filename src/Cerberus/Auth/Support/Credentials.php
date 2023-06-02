<?php

namespace Cerberus\Auth\Support;

class Credentials
{
    /**
     * The credentials data packet.
     *
     * @var array
     */
    protected $data;

    /**
     * Create new Credentials instance.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Set a specific credential detail in the credentials data packet.
     *
     * @param string $key
     * @param mixed  $value
     *
     * @return void
     */
    public function set(string $key, mixed $value): void
    {
        $this->data[$key] = $value;
    }

    /**
     * Get a specific credential detail from the credentials data packet.
     *
     * @param string $key
     * @param mixed  $default
     *
     * @return mixed
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return $this->data[$key] ?? $default;
    }

    /**
     * Get all credential details from the credentials data packet.
     *
     * @return array
     */
    public function all(): array
    {
        return $this->data;
    }

    /**
     * Determine if the credentials data packet has a specific credential detail.
     *
     * @param string $key
     *
     * @return bool
     */
    public function has(string $key): bool
    {
        return isset($this->data[$key]);
    }

    /**
     * Set the API token value for the credentials data packet.
     *
     * @param string $token
     *
     * @return void
     */
    public function setToken(string $token): void
    {
        $this->set('token', $token);
    }

    /**
     * Get the API token value from the credentials data packet.
     *
     * @return string
     */
    public function getToken(): string
    {
        return $this->get('token');
    }

    /**
     * Filter and return only local credentials from the credentials data packet.
     *
     * @return array
     */
    public function local(): array
    {
        return array_filter($this->data, function ($value, $key) {
            return ! in_array($key, ['token']);
        }, \ARRAY_FILTER_USE_BOTH);
    }
}
