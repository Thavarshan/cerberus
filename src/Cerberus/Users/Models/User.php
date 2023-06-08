<?php

namespace Cerberus\Users\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Notifications\Notifiable;
use Cerberus\Contracts\Users\User as UserInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cerberus\Shared\Persistence\Filters\Traits\Filterable;

class User extends Authenticatable implements UserInterface
{
    use HasFactory;
    use Notifiable;
    use Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return static::keyName();
    }

    /**
     * Get the route key for the model for external use.
     *
     * @return string
     */
    public static function keyName(): string
    {
        return 'username';
    }

    /**
     * Get user's ID.
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->getAttribute('id');
    }

    /**
     * Get user's name.
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->getAttribute('name');
    }

    /**
     * Get user's email.
     *
     * @return string
     */
    public function getEmail(): string
    {
        return $this->getAttribute('email');
    }

    /**
     * Find user by email.
     *
     * @param string $email
     *
     * @return \Cerberus\Contracts\Users\User|null
     */
    public function whereEmail($email): ?UserInterface
    {
        return $this->where('email', $email)->first();
    }

    /**
     * Find user by key name.
     *
     * @param int|string $value
     *
     * @return \Cerberus\Contracts\Users\User|null
     */
    public static function resolve(int|string $value): ?User
    {
        return static::where(static::keyName(), $value)->first();
    }
}
