<?php

namespace Cerberus\Interfaces\Persistence;

use ArrayAccess;
use JsonSerializable;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Routing\UrlRoutable;
use Illuminate\Contracts\Queue\QueueableEntity;
use Illuminate\Contracts\Broadcasting\HasBroadcastChannel;
use Illuminate\Contracts\Support\CanBeEscapedWhenCastToString;

// @phpcs:ignore
interface Model extends Arrayable, ArrayAccess, CanBeEscapedWhenCastToString, HasBroadcastChannel, Jsonable, JsonSerializable, QueueableEntity, UrlRoutable, Filterable, Fillable
{
    /**
     * Get all of the current attributes on the model.
     *
     * @return array
     */
    public function getAttributes();

    /**
     * Get model's ID.
     *
     * @return int
     */
    public function getId(): int;

    /**
     * Find a model by it's ID.
     *
     * @param int|string $id
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function find(int|string $id): ?Model;

    /**
     * Find a model by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function findBy(string $key, string $value): ?Model;

    /**
     * Add a basic where clause to the query.
     *
     * @param \Closure|string|array|\Illuminate\Contracts\Database\Query\Expression $column
     * @param mixed                                                                 $operator
     * @param mixed                                                                 $value
     * @param string                                                                $boolean
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function where(
        mixed $column,
        mixed $operator = null,
        mixed $value = null,
        string $boolean = 'and'
    ): Model;

    /**
     * Execute the query as a "select" statement.
     *
     * @return \Illuminate\Database\Eloquent\Collection|array<static>
     */
    public function get(): Collection|array;

    /**
     * Execute the query and get the first result.
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function first(): ?Model;

    /**
     * Save a new model and return the instance.
     *
     * @param \Cerberus\Interfaces\Persistence\DTO $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function create(DTO $dto): Model;

    /**
     * Update the model in the database.
     *
     * @param array $attributes
     * @param array $options
     *
     * @return bool
     */
    public function update(array $attributes = [], array $options = []);

    /**
     * Delete the model from the database.
     *
     * @return bool|null
     *
     * @throws \LogicException
     */
    public function delete();

    /**
     * Reload the current model instance with fresh attributes from the database.
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function refresh();
}
