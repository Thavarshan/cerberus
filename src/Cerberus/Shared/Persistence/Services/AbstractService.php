<?php

namespace Cerberus\Shared\Persistence\Services;

use Cerberus\Interfaces\Persistence\DTO;
use Cerberus\Interfaces\Persistence\Model;
use Cerberus\Interfaces\Persistence\Service;
use Cerberus\Interfaces\Persistence\Repository;

abstract class AbstractService implements Service
{
    /**
     * The repository instance.
     *
     * @var \Cerberus\Interfaces\Persistence\Repository
     */
    protected $repository;

    /**
     * Get the repository instance.
     *
     * @return \Cerberus\Interfaces\Persistence\Repository
     */
    public function getRepository(): Repository
    {
        return $this->repository;
    }

    /**
     * Find a model by their ID.
     *
     * @param int|string $id
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function find(int|string $id): ?Model
    {
        return $this->repository->find($id);
    }

    /**
     * Find a model by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function findBy(string $key, string $value): ?Model
    {
        return $this->repository->findBy($key, $value);
    }

    /**
     * Create a new model instance and persist to database.
     *
     * @param \Cerberus\Interfaces\Persistence\DTO $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function create(DTO $dto): Model
    {
        return $this->repository->create($dto);
    }

    /**
     * Update the given model instance.
     *
     * @param \Cerberus\Interfaces\Persistence\Model $model
     * @param \Cerberus\Interfaces\Persistence\DTO   $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function update(Model $model, DTO $dto): Model
    {
        return $this->repository->update($model, $dto);
    }

    /**
     * Delete the given model instance.
     *
     * @param \Cerberus\Interfaces\Persistence\Model $model
     *
     * @return void
     */
    public function delete(Model $model): void
    {
        $this->repository->delete($model);
    }
}
