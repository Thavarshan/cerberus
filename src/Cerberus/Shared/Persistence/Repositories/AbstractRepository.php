<?php

namespace Cerberus\Shared\Persistence\Repositories;

use Illuminate\Support\Facades\DB;
use Cerberus\Interfaces\Persistence\DTO;
use Cerberus\Interfaces\Persistence\Model;
use Cerberus\Interfaces\Persistence\Repository;

abstract class AbstractRepository implements Repository
{
    /**
     * The model instance.
     *
     * @var \Cerberus\Interfaces\Persistence\Model|null
     */
    protected $model;

    /**
     * Get the repository model instance.
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function getModel(): ?Model
    {
        return $this->model;
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
        return $this->model->find($id);
    }

    /**
     * Find a model by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function findBy(string $key, string $value): ?Model
    {
        return $this->model->where($key, $value)->first();
    }

    /**
     * Create a new model.
     *
     * @param \Cerberus\Interfaces\Persistence\DTO $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function create(DTO $dto): Model
    {
        return DB::transaction(function () use ($dto) {
            return $this->model->create($dto);
        });
    }

    /**
     * Update the attributes of an existing model and persist to database.
     *
     * @param \Cerberus\Interfaces\Persistence\Model $model
     * @param \Cerberus\Interfaces\Persistence\DTO   $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function update(Model $model, DTO $dto): Model
    {
        tap($model, function (Model $model) use ($dto) {
            $instance = $this->model->find($model->getId());

            $instance->update($dto->toArray());
        });

        $model->refresh();

        return $model;
    }

    /**
     * Delete an existing model and update database.
     *
     * @param \Cerberus\Interfaces\Persistence\Model $model
     *
     * @return void
     */
    public function delete(Model $model): void
    {
        tap($model->getId(), function (int $id) {
            $this->model->find($id)->delete();
        });
    }
}
