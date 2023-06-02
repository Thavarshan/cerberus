<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class RemoveHeaders
{
    /**
     * Remove headers from response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, \Closure $next): Response
    {
        /**
         * @var Response $response
         */
        $response = $next($request);

        /**
         * @var string $header
         */
        foreach ((array) config('headers.remove') as $header) {
            $response->headers->remove(key: $header);
        }

        return $response;
    }
}
