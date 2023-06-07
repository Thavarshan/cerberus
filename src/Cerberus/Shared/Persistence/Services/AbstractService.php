<?php

namespace Cerberus\Shared\Persistence\Services;

use Cerberus\Shared\Persistence\Repositories\AbstractRepository;

abstract class AbstractService
{
    /**
     * The repository instance.
     *
     * @var \Cerberus\Contracts\AbstractRepository
     */
    protected $repository;

    /**
     * Create a new service instance.
     *
     * @param \Cerberus\Contracts\AbstractRepository $repository
     *
     * @return void
     */
    public function __construct(AbstractRepository $repository)
    {
        $this->repository = $repository;
    }
}
