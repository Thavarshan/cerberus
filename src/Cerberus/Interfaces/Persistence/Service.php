<?php

namespace Cerberus\Interfaces\Persistence;

interface Service
{
    /**
     * Get the repository instance.
     *
     * @return \Cerberus\Interfaces\Persistence\Repository
     */
    public function getRepository(): Repository;

    /**
     * Find a model by their ID.
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
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function findBy(string $key, string $value): ?Model;

    /**
     * Create a new model instance and persist to database.
     *
     * @param \Cerberus\Interfaces\Persistence\DTO $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function create(DTO $dto): Model;

    /**
     * Update the given model instance.
     *
     * @param \Cerberus\Interfaces\Persistence\Model $model
     * @param \Cerberus\Interfaces\Persistence\DTO   $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function update(Model $model, DTO $dto): Model;

    /**
     * Delete the given model instance.
     *
     * @param \Cerberus\Interfaces\Persistence\Model $model
     *
     * @return void
     */
    public function delete(Model $model): void;
}
