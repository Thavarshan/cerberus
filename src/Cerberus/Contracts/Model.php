<?php

namespace Cerberus\Contracts;

use Illuminate\Database\Eloquent\Model as EloquentModel;

abstract class Model extends EloquentModel implements Filterable
{
}
