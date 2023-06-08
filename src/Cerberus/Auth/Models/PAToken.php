<?php

namespace Cerberus\Auth\Models;

use Cerberus\Contracts\Auth\HasAbilities;
use Cerberus\Shared\Persistence\Models\Model;

class PAToken extends Model implements HasAbilities
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'personal_access_tokens';

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'abilities' => 'json',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'value',
        'user_id',
        'abilities',
        'expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'value',
    ];

    /**
     * Find the token instance matching the given token.
     *
     * @param string $token
     *
     * @return static|null
     */
    public static function findToken(string $token): ?static
    {
        if (false === strpos($token, '|')) {
            return static::where('value', hash('sha256', $token))->first();
        }

        [$id, $token] = explode('|', $token, 2);

        if ($instance = static::find($id)) {
            return hash_equals(
                $instance->value,
                hash('sha256', $token)
            ) ? $instance : null;
        }
    }

    /**
     * Determine if the token has a given ability.
     *
     * @param string $ability
     *
     * @return bool
     */
    public function can(string $ability): bool
    {
        return in_array('*', $this->abilities)
            || array_key_exists($ability, array_flip($this->abilities));
    }

    /**
     * Determine if the token is missing a given ability.
     *
     * @param string $ability
     *
     * @return bool
     */
    public function cant(string $ability): bool
    {
        return ! $this->can($ability);
    }

    /**
     * Set the last used at timestamp.
     *
     * @param \DateTimeInterface $timestamp
     *
     * @return void
     */
    public function setLastUsed(\DateTimeInterface $timestamp): void
    {
        $this->forceFill(['last_used_at' => $timestamp])->save();
    }

    /**
     * Get the ID of the user this token belongs to.
     *
     * @return int|null
     */
    public function getUserId(): ?int
    {
        return $this->user_id;
    }
}
