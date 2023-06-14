<?php

namespace Cerberus\Shared\Persistence\Models;

use Illuminate\Support\Collection;
use Cerberus\Interfaces\Persistence\DTO;
use Cerberus\Shared\Persistence\Models\Traits\Fillable;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Cerberus\Shared\Persistence\Models\Traits\Filterable;
use Cerberus\Interfaces\Persistence\Model as ModelInterface;

abstract class Model extends EloquentModel implements ModelInterface
{
    use Fillable;
    use Filterable;

    /**
     * Query results.
     *
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $queryResults;

    /**
     * Get model's ID.
     *
     * @return int
     */
    public function getId(): int
    {
        return (int) $this->getAttribute($this->getKeyName());
    }

    /**
     * Find a model by it's ID.
     *
     * @param int|string $id
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function find(int|string $id): ?ModelInterface
    {
        return static::query()->find($id);
    }

    /**
     * Find a model by the given key.
     *
     * @param string $key
     * @param string $value
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function findBy(string $key, string $value): ?ModelInterface
    {
        return static::query()->where($key, $value)->first();
    }

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
    ): ModelInterface {
        $this->queryResults = static::query();

        $this->queryResults->where($column, $operator, $value, $boolean);

        return $this;
    }

    /**
     * Execute the query as a "select" statement.
     *
     * @return \Illuminate\Database\Eloquent\Collection|array<static>
     */
    public function get(): Collection|array
    {
        return $this->queryResults->get();
    }

    /**
     * Execute the query and get the first result.
     *
     * @return \Cerberus\Interfaces\Persistence\Model|null
     */
    public function first(): ?ModelInterface
    {
        if (null === $this->queryResults) {
            return null;
        }

        return $this->newInstance(
            $this->queryResults->first()->getAttributes()
        );
    }

    /**
     * Save a new model and return the instance.
     *
     * @param \Cerberus\Interfaces\Persistence\DTO $dto
     *
     * @return \Cerberus\Interfaces\Persistence\Model
     */
    public function create(DTO $dto): ModelInterface
    {
        $created = static::query()->create($dto->all());

        return $this->newInstance($created->getAttributes());
    }
}
