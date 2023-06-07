<?php

namespace Cerberus\Shared\Persistence\Models;

use Cerberus\Contracts\Shared\Entity;
use Cerberus\Contracts\Shared\Fillable;
use Illuminate\Database\Eloquent\Model as EloquentModel;
use Cerberus\Shared\Persistence\Models\Traits\Fillable as FillableTrait;

abstract class Model extends EloquentModel implements Fillable, Entity
{
    use FillableTrait;
}
