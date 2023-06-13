<?php

namespace App\Http\Requests;

use Illuminate\Support\Traits\Tappable;
use Illuminate\Foundation\Http\FormRequest;
use App\Support\Traits\InteractsWithContainer;
use App\Http\Requests\Traits\AuthorizesRequests;
use App\Http\Requests\Traits\HasCustomValidator;
use App\Http\Requests\Traits\InputValidationRules;

abstract class Request extends FormRequest
{
    use AuthorizesRequests;
    use InputValidationRules;
    use HasCustomValidator;
    use InteractsWithContainer;
    use Tappable;
}
