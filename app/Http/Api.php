<?php

namespace App\Http;

final class Api
{
    /**
     * Get the current application URL from the "APP_URL" environment variable - with port.
     *
     * @return string
     */
    public static function currentApplicationUrlWithPort(): string
    {
        $appUrl = config('app.url');

        // phpcs:ignore
        return $appUrl ? ',' . parse_url($appUrl, \PHP_URL_HOST) . (parse_url($appUrl, \PHP_URL_PORT) ? ':' . parse_url($appUrl, \PHP_URL_PORT) : '') : '';
    }
}
